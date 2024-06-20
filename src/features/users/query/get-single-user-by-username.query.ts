import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BaseLoaderFunctionOptions } from '@/features/shared/lib/react-query-loader';
import { getSingleUserByUsername } from '../actions/get-single-user.action';
import { type QueryConfig } from '@/features/shared/lib/react-query';
import { type UserProfile } from '../types/user.types';

export const SINGLE_USER_QUERY_KEY = 'current-user';

export function getSingleUserByUsernameOptions(username: string) {
  return queryOptions({
    queryKey: [SINGLE_USER_QUERY_KEY, username],
    queryFn: async () => getSingleUserByUsername(username),
  });
}

type UseGetSingleUserByUsernameOptions = {
  username: string;
  queryConfig?: QueryConfig<UserProfile | null>;
};
export function useGetSingleUserByUsername({
  username,
  queryConfig = {},
}: UseGetSingleUserByUsernameOptions) {
  return useQuery({
    ...getSingleUserByUsernameOptions(username),
    ...queryConfig,
  });
}

type PrefetchSingleUserOptions = UseGetSingleUserByUsernameOptions &
  BaseLoaderFunctionOptions;

export async function prefetchSingleUserByUsername({
  username,
  queryClient,
  queryConfig = {},
}: PrefetchSingleUserOptions) {
  await queryClient.prefetchQuery({
    ...getSingleUserByUsernameOptions(username),
    ...queryConfig,
  });
}
