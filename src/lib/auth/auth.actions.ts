'use server';

import cookie from 'cookie';
import { cookies } from 'next/headers';
import { registerValidator, loginValidator } from './auth.validator';
import { type ApiResponse, api } from '@/lib/api';
import { unstable_noStore as noStore } from 'next/cache';
import { env } from '../env';
import { type User, type Login, type Register } from './auth.types';
import { parseAxiosError } from '../error';

export const register = async (registerData: Register) => {
  noStore();

  const validatedData = await registerValidator.parseAsync(registerData);

  try {
    const { data } = await api.post<ApiResponse<null>>(
      '/auth/register',
      validatedData,
    );

    return data;
  } catch (error) {
    return parseAxiosError(error);
  }
};

export const login = async (loginData: Login) => {
  noStore();

  const validatedData = await loginValidator.parseAsync(loginData);

  const { data, headers } = await api.post<
    ApiResponse<{ accessToken: string; refreshToken: string }>
  >('/auth/login', validatedData);

  const cookiesStore = cookies();
  const refreshToken = cookie.parse(headers['set-cookie']![0]);

  cookiesStore.set('refreshToken', refreshToken.refreshToken, {
    maxAge: Number(refreshToken['Max-Age']),
    expires: new Date(refreshToken.Expires),
    secure: env.NODE_ENV === 'production',
    sameSite: (refreshToken.SameSite as 'none') || 'none',
    httpOnly: true,
  });

  return data;
};

export const logout = () => {
  const cookiesStore = cookies();
  cookiesStore.delete('refreshToken');
};

export const getAccessToken = async () => {
  noStore();

  const { data } =
    await api.get<ApiResponse<{ accessToken: string }>>('/auth/refresh');

  return data;
};

export const getLoggedInUser = async (accessToken: string) => {
  noStore();

  const { data } = await api.get<ApiResponse<User>>('/auth/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
