import Axios, { type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const api = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

export function apiWithAuth(cookies: ReadonlyRequestCookies) {
  const allCookiesStr = cookies
    .getAll()
    .reduce((acc, { name, value }) => `${acc}${name}=${value};`, '');
  const accessToken = cookies.get('accessToken')?.value;

  if (!accessToken) {
    // !TODO: Handle missing access token error properly
    throw new Error('Access token is missing');
  }

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      config.headers.Accept = 'application/json';
    }

    config.withCredentials = true;
    config.headers.Cookie = allCookiesStr;
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });

  return api;
}
