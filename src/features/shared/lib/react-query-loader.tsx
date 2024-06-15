import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

export type BaseLoaderFunctionOptions = {
  queryClient: QueryClient;
};

export type ReactQueryLoaderProps = Readonly<{
  children: React.ReactNode;
  loaders: Array<(options: BaseLoaderFunctionOptions) => Promise<void>>;
}>;
export async function ReactQueryLoader(props: ReactQueryLoaderProps) {
  const queryClient = new QueryClient();

  // !TODO: Implement the loaders error handling
  await Promise.allSettled(
    props.loaders.map(async loader => loader({ queryClient })),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}
