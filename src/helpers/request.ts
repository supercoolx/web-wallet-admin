import axios, { AxiosPromise, Method, AxiosRequestConfig } from 'axios';
import { CORS_DISABLED } from '@/config';

const request = <T>(
  method: Method,
  url: AxiosRequestConfig['url'],
  data: AxiosRequestConfig['data'] = {},
  token?: string
): AxiosPromise<T> => {
  const headers: AxiosRequestConfig['headers'] = {
    'Access-Control-Allow-Origin': '*',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const payloadKey = method.toLowerCase() === 'get' ? 'params' : 'data';

  return axios({
    [payloadKey]: data,
    headers,
    method: method.toUpperCase() as Method,
    url,
    withCredentials: CORS_DISABLED !== 'true',
    validateStatus(status) {
      return status >= 200 && status < 500; // only throw on status 500
    },
  });
};

export default request;
