import { makeAutoObservable } from 'mobx';
import jwtDecode from 'jwt-decode';
import { createContext } from 'react';
import request from '@/helpers/request';
import { API_URL } from '@/config';

const TOKEN_STORAGE_KEY = 'genutoken';
const SIGNIN_URL = `${API_URL}/genubank/signin`;
const SIGNUP_URL = `${API_URL}/genubank/signup`;
const SIGNOUT_URL = `${API_URL}/genubank/signout`;

interface JWT {
  id: string;
  ext: string;
  rol: string;
  tgt: string;
  addr: string;
  read: boolean;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sub: string;
}

type SignInResponse = {
  token: string;
  message: never;
} & {
  token: never;
  message: string;
};

type SignUpSuccess = {
  id: string;
  token: string;
  error: never;
  statusCode: never;
};

type SignUpError = {
  id: never;
  token: never;
  error: {
    errorCode: string; // e.g. 'pds.400.DuplicateIdentity'
    message: string;
  };
  statusCode: number;
};

type SignUpResponse = SignUpSuccess & SignUpError;

class UserStore {
  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  private _token = '';

  get token(): string {
    return this._token || window.localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  }

  set token(token: string) {
    // need to keep it also in memory, to avoid issues when consequently writing and
    // reading from local storage
    this._token = token;

    if (!token) {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  get signedIn() {
    return this.checkAuth();
  }

  async signIn(username: string, password: string) {
    const { data, status } = await request<SignInResponse>('post', SIGNIN_URL, {
      username,
      password,
    });

    if (status !== 200) {
      throw new Error(data.message);
    }

    this.setAuth(data.token);
  }

  async signUp(username: string, password: string) {
    const { data, status } = await request<SignUpResponse>('post', SIGNUP_URL, {
      username,
      password,
    });

    if (status !== 200 && data.error) {
      throw new Error((data as SignUpError).error.message);
    }

    this.setAuth(data.token);
  }

  setAuth(token: string): void {
    this.token = token;
    this.checkAuth(token);
  }

  async invalidateAuth(): Promise<void> {
    if (!this.token) {
      return;
    }

    const { data, status } = await request<SignInResponse>(
      'post',
      SIGNOUT_URL,
      undefined,
      this.token
    );

    if (status !== 200) {
      throw new Error(data.message);
    }

    this.token = '';
  }

  checkAuth(token = this.token): boolean {
    if (!token) {
      this.invalidateAuth();
      return false;
    }

    try {
      const { exp } = jwtDecode(token) as JWT;

      const isExpired = Date.now() > exp * 1000;

      if (isExpired) {
        this.invalidateAuth();
        return false;
      }

      return true;
    } catch (ex) {
      this.invalidateAuth();
    }

    this.invalidateAuth();
    return false;
  }
}

const userStore = new UserStore();
const userContext = createContext<UserStore>(userStore);

export { userStore, userContext };
