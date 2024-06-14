import { type z } from 'zod';
import { type registerValidator } from '@/features/auth/validators/register.validator';

export type Register = z.infer<typeof registerValidator>;
