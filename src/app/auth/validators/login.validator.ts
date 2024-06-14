import z from 'zod';

export const loginValidator = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email cannot be empty!')
    .email('Invalid email!'),
  password: z.string().trim().min(8, 'Password must be at least 8 characters!'),
});
