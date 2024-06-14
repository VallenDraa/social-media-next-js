import z from 'zod';

export const registerValidator = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Username cannot be empty!')
      .max(20, "Username can't be longer than 20 characters!"),
    email: z
      .string()
      .trim()
      .min(1, 'Email cannot be empty!')
      .email('Invalid email!'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters!'),
    confirmPassword: z
      .string()
      .trim()
      .min(8, 'Password Confirmation must be at least 8 characters!'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
  });
