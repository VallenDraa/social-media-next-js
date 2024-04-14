'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from '../auth';

export const rootReducer = combineReducers({ auth: authSliceReducer });
export const store = configureStore({ reducer: rootReducer });
