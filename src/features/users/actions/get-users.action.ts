'use server';

import { type PaginatedApiResponse } from '@/features/shared/types/api.types';
import { type UserProfile, type User } from '@/features/users/types/user.types';
import { apiWithAuth } from '@/features/shared/lib/api-client';
import { cookies } from 'next/headers';
import { userProfileDto } from '../dto/user-profile.dto';
import { makeServerActionError } from '@/features/shared/utils/error-parser';

export type GetUsersOptions = {
  keyword?: string;
  limit?: number;
  page?: number;
};

export type GetUsersResponse = PaginatedApiResponse<{ users: UserProfile[] }>;

export async function getUsers({
  keyword = '',
  limit = 20,
  page = 1,
}: GetUsersOptions = {}): Promise<GetUsersResponse> {
  try {
    let endpoint = `/users?limit=${limit}&page=${page}`;

    if (keyword) {
      endpoint += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response =
      await apiWithAuth(cookies()).get<PaginatedApiResponse<{ users: User[] }>>(
        endpoint,
      );

    return {
      ...response.data,
      data: {
        users: response.data.data.users.map(userProfileDto),
      },
    };
  } catch (error) {
    const errObj = makeServerActionError(error);
    throw errObj;
  }
}
