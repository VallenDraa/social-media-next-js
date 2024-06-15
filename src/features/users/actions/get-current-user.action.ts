'use server';

import {
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from '@/features/shared/types/api.types';
import { type User } from '@/features/users/types/user.types';
import { apiWithAuth } from '@/features/shared/lib/api-client';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  try {
    const response =
      await apiWithAuth(cookies()).get<ApiSuccessResponse<{ user: User }>>(
        '/auth/me',
      );

    return response.data.data.user;
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      return error.response!.data;
    }

    throw error;
  }
}
