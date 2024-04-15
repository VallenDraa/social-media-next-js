import z from 'zod';
import { assertISODate } from '@elunic/is-iso-date';

export const registerValidator = z.object({
  username: z.string().min(1, 'username is required'),
  email: z.string().email('email is invalid'),
  password: z.string().min(8, 'password must be atleast 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'password confirmation must be atleast 8 characters long'),
});

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userValidator = z.object({
  id: z.string().uuid(),
  profilePicture: z.string().url().optional(),
  username: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().refine(assertISODate, 'not a valid ISO string date'),
  updatedAt: z.string().refine(assertISODate, 'not a valid ISO string date'),
});
