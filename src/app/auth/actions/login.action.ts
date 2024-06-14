'use server';

import { api } from '@/shared/lib/api-client';
import { getErrorMessage } from '@/shared/utils/error-parser';
import { type ApiSuccessResponse } from '@/shared/types/api.types';
import { type Login } from '../types/login.types';
import { loginValidator } from '../validators/login.validator';
import { setCookie } from '@/shared/utils/set-cookie';
import { cookies } from 'next/headers';

export async function login(data: Login) {
  const validatedData = loginValidator.parse(data);

  try {
    const response = await api.post<ApiSuccessResponse<null>>(
      '/auth/login',
      validatedData,
    );

    const setCookies = response.headers['set-cookie'];
    const cookieStore = cookies();

    setCookies?.forEach(setCookieString => {
      setCookie(setCookieString, cookieStore);
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
