import z from 'zod';

export const registerValidator = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userValidator = z.object({
  id: z.string(),
  profilePicture: z.string(),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
