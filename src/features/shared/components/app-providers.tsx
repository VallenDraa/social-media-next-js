'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { env } from '@/config/env';

const themes = ['dark', 'light', 'system'];

export type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;
export function AppProviders(props: AppProvidersProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 6 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {env.NEXT_PUBLIC_APP_ENV === 'development' && <ReactQueryDevtools />}
      <ThemeProvider
        attribute='class'
        enableSystem
        defaultTheme='system'
        themes={themes}
      >
        {props.children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
