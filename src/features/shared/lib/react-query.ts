import { type FetchQueryOptions } from '@tanstack/react-query';

export type QueryConfig<T> = Omit<
  FetchQueryOptions<T, Error, T, string[]>,
  'queryKey' | 'queryFn'
>;
