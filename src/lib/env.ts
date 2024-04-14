import z from 'zod';

export const envValidator = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = envValidator.parse(process.env);
