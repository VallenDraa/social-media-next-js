import React from 'react';
import { Skeleton } from './skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export type AvatarWithSkeletonProps = Readonly<{
  isLoading: boolean;
  src: string;
  alt: string;
  fallback: string;
}>;

export const AvatarWithSkeleton = React.memo(
  (props: AvatarWithSkeletonProps) => {
    const { isLoading, src, alt, fallback } = props;

    if (isLoading) {
      return <Skeleton className='h-10 w-10 rounded-full' />;
    }

    return (
      <Avatar id='user-profile'>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    );
  },
);

AvatarWithSkeleton.displayName = 'AvatarWithSkeleton';
