import {
  QueryKey,
  infiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { type BaseLoaderFunctionOptions } from '@/features/shared/lib/react-query-loader';
import { type InfiniteQueryConfig } from '@/features/shared/lib/react-query';
import {
  type GetUsersOptions,
  type GetUsersResponse,
  getUsers,
} from '@/features/users/actions/get-users.action';

export const USERS_QUERY_KEY = 'users';

export function getUsersOptions(options?: GetUsersOptions) {
  return infiniteQueryOptions({
    initialPageParam: 1,
    queryKey: [USERS_QUERY_KEY, options],
    getNextPageParam(lastPageData: GetUsersResponse, _a, lastPageParam) {
      const { currentPage, lastPage } = lastPageData.metadata;

      if (lastPage === lastPageParam) {
        return null;
      }

      return currentPage + 1;
    },
    queryFn: async ctx => getUsers({ ...options, page: ctx.pageParam }),
  });
}

type UseGetUsersOptions = {
  options?: GetUsersOptions;
  queryConfig?: InfiniteQueryConfig<
    GetUsersResponse,
    // !TODO: In the future bind this to the queryKey type in getUsersOptions
    Array<string | GetUsersOptions | undefined>
  >;
};

export function useGetUsers({
  queryConfig = {},
  options,
}: UseGetUsersOptions = {}) {
  return useInfiniteQuery({ ...getUsersOptions(options), ...queryConfig });
}

type PrefetchCurrentUserOptions = UseGetUsersOptions &
  BaseLoaderFunctionOptions;

export async function prefetchUsers({
  options,
  queryClient,
  queryConfig = {},
}: PrefetchCurrentUserOptions) {
  await queryClient.prefetchInfiniteQuery({
    ...getUsersOptions(options),
    ...queryConfig,
  });
}
