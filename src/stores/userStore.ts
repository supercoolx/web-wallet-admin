/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { CORS_DISABLED } from '@/config';

const TOKEN_STORAGE_KEY = 'admintoken';
const SIGNIN_URL =
  '/api/keycloak/auth/realms/wallet/protocol/openid-connect/token';

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

type SignInError = {
  error: string;
  error_description: string;
};

type SignInResponse = {
  token: string;
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
};

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
    const { data, status } = (await axios({
      data: [
        'client_id=wallet_admin',
        'grant_type=password',
        `password=${password}`,
        `username=${username}`,
      ].join('&'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      url: SIGNIN_URL,
      withCredentials: CORS_DISABLED !== 'true',
      validateStatus(s) {
        return s >= 200 && s < 500; // only throw on status 500
      },
    })) as AxiosResponse<SignInError | SignInResponse>;

    const errorData = data as SignInError;
    if (status !== 200 || errorData.error) {
      throw new Error(errorData.error_description);
    }

    const signInData = data as SignInResponse;
    this.setAuth(signInData.access_token);
  }

  setAuth(token: string): void {
    this.token = token;
    this.checkAuth(token);
  }

  async invalidateAuth(): Promise<void> {
    if (!this.token) {
      return;
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
