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
import Link from 'next/link';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSkeleton,
} from '@/features/shared/components/ui/avatar';
import { getInitials } from '../utils';

export function CurrentUserProfileDropdown() {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isErrorApiResponse(currentUser)) {
    throw new Error(currentUser.message);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        {isLoading || !currentUser ? (
          <AvatarSkeleton />
        ) : (
          <Avatar>
            <AvatarImage
              src={currentUser.profilePicture}
              alt={currentUser.username}
            />
            <AvatarFallback>{getInitials(currentUser.username)}</AvatarFallback>
          </Avatar>
        )}

        <span className='sr-only'>Open Profile Dropdown</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {/* Dialog trigger for user profile detail */}
        <DropdownMenuItem asChild className='gap-1'>
          {!isLoading && currentUser ? (
            <Link href={`/@${currentUser.username}`}>
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
