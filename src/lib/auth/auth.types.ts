import type z from 'zod';
import {
  type loginValidator,
  type registerValidator,
  type userValidator,
} from './auth.validator';

export type User = z.infer<typeof userValidator>;
export type Register = z.infer<typeof registerValidator>;
export type Login = z.infer<typeof loginValidator>;

export type AuthState = {
  accessToken: string | null;
  user: User | null;
};
