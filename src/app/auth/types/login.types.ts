import { type z } from 'zod';
import { type loginValidator } from '../validators/login.validator';

export type Login = z.infer<typeof loginValidator>;
