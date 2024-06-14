import Axios, { type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';

export const api = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
});
