'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const queryClient = new QueryClient();

const themes = ['dark', 'light', 'system'];

export type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;
export function AppProviders(props: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem defaultTheme='system' themes={themes}>
        {props.children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
