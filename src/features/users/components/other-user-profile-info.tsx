'use client';

import React from 'react';
import { getErrorMessage } from '@/features/shared/utils/error-parser';
import { useGetSingleUserByUsername } from '../query/get-single-user-by-username.query';
import {
  UserProfileHeader,
  UserProfileHeaderSkeleton,
} from './user-profile-header';

export type UserProfileInfoProps = Readonly<{
  username: string;
}>;

export function OtherUserProfileInfo(props: UserProfileInfoProps) {
  const { username } = props;
  const { data, isLoading, error } = useGetSingleUserByUsername({ username });

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
