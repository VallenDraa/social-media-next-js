import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSkeleton,
} from '@/features/shared/components/ui/avatar';
import { getInitials } from '../utils';
import { type UserProfile } from '../types/user.types';
import { Skeleton } from '@/features/shared/components/ui/skeleton';

export function UserProfileHeaderSkeleton() {
  return (
    <div>
      <AvatarSkeleton />

      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
    </div>
  );
}

export type UserProfileHeaderProps = {
  user: UserProfile;
};

export function UserProfileHeader(props: UserProfileHeaderProps) {
  const { user } = props;

  return (
    <header>
      <Avatar>
        <AvatarImage src={user.profilePicture} alt={user.username} />
        <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
      </Avatar>

      <div className='text-lg font-bold'>{`username: ${user.username}`}</div>
      <div className='text-lg font-bold'>{`joined on: ${new Date(user.createdAt).getFullYear()}`}</div>
    </header>
  );
}
