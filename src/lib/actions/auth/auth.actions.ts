'use server';

import { cookies } from 'next/headers';
import {
  type User,
  type Login,
  type Register,
  registerValidator,
  loginValidator,
} from './auth.validator';
import { api } from '@/lib/api/api';
import { type ApiResponse } from '../../api';

export const register = async (formData: FormData) => {
  const invalidatedRegisterData: Register = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const body = registerValidator.parse(invalidatedRegisterData);

  return api.post('/auth/register', body);
};

export const login = async (formData: FormData) => {
  const invalidatedLoginData: Login = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const body = loginValidator.parse(invalidatedLoginData);

  const response = await api.post<
    ApiResponse<{ accessToken: string; refreshToken: string }>
  >('/auth/login', body);

  return response;
};

export const logout = () => {
  cookies().delete('refreshToken');
};

export const me = async (accessToken: string) => {
  const response = await api.get<ApiResponse<User>>('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
