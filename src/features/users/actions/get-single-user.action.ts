'use server';

import { type ApiSuccessResponse } from '@/features/shared/types/api.types';
import { type User } from '@/features/users/types/user.types';
import { apiWithAuth } from '@/features/shared/lib/api-client';
import { cookies } from 'next/headers';
import { userProfileDto } from '../dto/user-profile.dto';
import { userIdValidator, usernameValidator } from '../validators';
import { makeServerActionError } from '@/features/shared/utils/error-parser';
import { isAxiosError } from 'axios';

export async function getSingleUserByUsername(username: string) {
  try {
    const validatedUsername = await usernameValidator.parseAsync(username);

    const response = await apiWithAuth(cookies()).get<
      ApiSuccessResponse<{ user: User }>
    >(`/users/username/${validatedUsername}`);

    return userProfileDto(response.data.data.user);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
    }

    const errObj = makeServerActionError(error);
    throw errObj;
  }
}

export async function getSingleUserById(userId: string) {
  try {
    const validatedUserId = await userIdValidator.parseAsync(userId);

    const response = await apiWithAuth(cookies()).get<
      ApiSuccessResponse<{ user: User }>
    >(`/users/${validatedUserId}`);

    return userProfileDto(response.data.data.user);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
    }

    const errObj = makeServerActionError(error);
    throw errObj;
  }
}
