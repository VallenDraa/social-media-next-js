import { z } from 'zod';

export const usernameValidator = z
  .string()
  .min(1, 'Username must atleast be 1 character long');

export const userIdValidator = z.string().uuid();
