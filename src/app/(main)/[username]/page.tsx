import {
  type BaseLoaderFunctionOptions,
  ReactQueryLoader,
} from '@/features/shared/lib/react-query-loader';
import { getCurrentUser } from '@/features/users/actions/get-current-user.action';
import { getSingleUserByUsername } from '@/features/users/actions/get-single-user.action';
import { CurrentUserProfileInfo } from '@/features/users/components/current-user-profile-info';
import { OtherUserProfileInfo } from '@/features/users/components/other-user-profile-info';
import { prefetchCurrentUser } from '@/features/users/query/get-current-user.query';
import { prefetchSingleUserByUsername } from '@/features/users/query/get-single-user-by-username.query';
import { getUsernameFromUrl } from '@/features/users/utils';
import { queryOptions } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const username = getUsernameFromUrl(params.username);
  if (!username) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const givenUser = await getSingleUserByUsername(username);

  if (!givenUser) {
    notFound();
  }

  const isGivenUserCurrentUser = currentUser.username === username;

  return (
    <div>
      <ReactQueryLoader
        loaders={[
          async (options: BaseLoaderFunctionOptions) =>
            isGivenUserCurrentUser
              ? prefetchCurrentUser({
                  ...options,
                  queryConfig: { initialData: currentUser },
                })
              : prefetchSingleUserByUsername({
                  ...options,
                  username,
                  queryConfig: { initialData: givenUser },
                }),
        ]}
      >
        {isGivenUserCurrentUser ? (
          <CurrentUserProfileInfo />
        ) : (
          <OtherUserProfileInfo username={username} />
        )}
      </ReactQueryLoader>
    </div>
  );
}
