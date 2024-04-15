'use client';

import React from 'react';
import { Toaster } from '@/components/ui';
import { StoreProvider } from './store-provider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <Toaster />
    </StoreProvider>
  );
}
