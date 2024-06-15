'use client';

import React from 'react';
import { useGetCurrentUser } from '../query/get-current-user.query';
import { isErrorApiResponse } from '@/features/shared/utils/error-parser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/features/shared/components/ui/dropdown-menu';
import { AvatarWithSkeleton } from '@/features/shared/components/ui/avatar-with-skeleton';
import Link from 'next/link';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@/features/shared/components/ui/skeleton';

export function CurrentUserProfileDropdown() {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isErrorApiResponse(currentUser)) {
    throw new Error(currentUser.message);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        <AvatarWithSkeleton
          isLoading={isLoading || !currentUser}
          src={currentUser?.profilePicture ?? ''}
          alt={currentUser?.username ?? ''}
          fallback={currentUser?.username.slice(0, 2) ?? ''}
        />

        <span className='sr-only'>Open Profile Dropdown</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {/* Dialog trigger for user profile detail */}
        <DropdownMenuItem asChild className='gap-1'>
          {!isLoading && currentUser ? (
            <Link href={'/profile'}>
              <PersonIcon />
              <span>Profile</span>
            </Link>
          ) : (
            <Skeleton className='h-8 w-full rounded' />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem asChild className='gap-1'>
          <Link href='/auth/login'>
            <ExitIcon />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
