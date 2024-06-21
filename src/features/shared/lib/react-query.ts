import {
  type FetchQueryOptions,
  type FetchInfiniteQueryOptions,
  type QueryKey,
} from '@tanstack/react-query';

export type QueryConfig<T> = Partial<
  Omit<FetchQueryOptions<T, Error, T, string[]>, 'queryKey' | 'queryFn'>
>;

export type InfiniteQueryConfig<T, Q extends QueryKey> = Partial<
  Omit<
    FetchInfiniteQueryOptions<T, Error, T, Q, number>,
    'queryKey' | 'queryFn' | 'initialPageParam'
  >
>;
