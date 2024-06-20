'use server';

import { type ApiSuccessResponse } from '@/features/shared/types/api.types';
import { type User } from '@/features/users/types/user.types';
import { apiWithAuth } from '@/features/shared/lib/api-client';
import { cookies } from 'next/headers';
import { userProfileDto } from '../dto/user-profile.dto';
import { makeServerActionError } from '@/features/shared/utils/error-parser';

export async function getCurrentUser() {
  try {
    const response =
      await apiWithAuth(cookies()).get<ApiSuccessResponse<{ user: User }>>(
        '/auth/me',
      );

    return userProfileDto(response.data.data.user);
  } catch (error) {
    const errObj = makeServerActionError(error);
    throw errObj;
  }
}
