import { queryOptions, useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/features/users//actions/get-current-user.action';
import { type BaseLoaderFunctionOptions } from '@/features/shared/lib/react-query-loader';
import { type UserProfile } from '../types/user.types';
import { type QueryConfig } from '@/features/shared/lib/react-query';

export const CURRENT_USER_QUERY_KEY = 'current-user';

export function getCurrentUserOptions() {
  return queryOptions({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: async () => getCurrentUser(),
  });
}

type UseGetCurrentUserOptions = {
  queryConfig?: QueryConfig<UserProfile>;
};
export function useGetCurrentUser({
  queryConfig = {},
}: UseGetCurrentUserOptions = {}) {
  return useQuery({ ...getCurrentUserOptions(), ...queryConfig });
}

type PrefetchCurrentUserOptions = UseGetCurrentUserOptions &
  BaseLoaderFunctionOptions;

export async function prefetchCurrentUser({
  queryClient,
  queryConfig = {},
}: PrefetchCurrentUserOptions) {
  await queryClient.prefetchQuery({
    ...getCurrentUserOptions(),
    ...queryConfig,
  });
}
