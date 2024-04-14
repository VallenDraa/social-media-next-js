'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

export type StoreProviderProps = {
  children: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
