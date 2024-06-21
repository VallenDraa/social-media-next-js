'use client';

import React from 'react';
import { getErrorMessage } from '@/features/shared/utils/error-parser';

import { useGetCurrentUser } from '../query/get-current-user.query';
import {
  UserProfileHeader,
  UserProfileHeaderSkeleton,
} from './user-profile-header';

export function CurrentUserProfileInfo() {
  const { data, isLoading, error } = useGetCurrentUser();

  if (isLoading || !data) {
    return <UserProfileHeaderSkeleton />;
  }

  if (error && !isLoading) {
    return <div className='text-red-600'>{getErrorMessage(error)}</div>;
  }

  return (
    <div>
      <UserProfileHeader user={data} />
    </div>
  );
}
