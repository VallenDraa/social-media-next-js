'use server';

import { api } from '@/features/shared/lib/api-client';
import { type Register } from '../types/register.types';
import { registerValidator } from '@/features/auth/validators/register.validator';
import { getErrorMessage } from '@/features/shared/utils/error-parser';
import { type ApiSuccessResponse } from '@/features/shared/types/api.types';

export async function register(data: Register) {
  const validatedData = registerValidator.parse(data);

  try {
    const response = await api.post<ApiSuccessResponse<null>>(
      '/auth/register',
      validatedData,
    );

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
