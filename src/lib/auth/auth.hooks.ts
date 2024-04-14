'use client';

import { useAppSelector } from '../store';

export const useGetUser = () => useAppSelector(state => state.auth.user);

export const useGetAccessToken = () =>
  useAppSelector(state => state.auth.accessToken);
