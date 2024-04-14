'use client';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, type AuthState } from './auth.types';

export const authInitialState: AuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authInitialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    unsetAccessToken(state) {
      state.accessToken = null;
    },
    unsetUser(state) {
      state.user = null;
    },
  },
});

export const { setAccessToken, unsetAccessToken, unsetUser } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;
