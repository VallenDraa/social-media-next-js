'use server';

import { api } from '@/shared/lib/api-client';
import { type Register } from '../types/register.types';
import { registerValidator } from '../validators/register.validator';
import { getErrorMessage } from '@/shared/utils/error-parser';
import { type ApiSuccessResponse } from '@/shared/types/api.types';

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
