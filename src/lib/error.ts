import { isAxiosError } from 'axios';
import z from 'zod';
import { defaultApiError, unknownErrorMessage } from './constants';
import { type ErrorApiResponse } from './api';

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => issue.message);
    return errors.join('\n');
  }

  if (isAxiosError<ErrorApiResponse>(err)) {
    return err.response?.data.message ?? err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return unknownErrorMessage;
}

export function parseAxiosError(err: unknown) {
  if (isAxiosError<ErrorApiResponse>(err)) {
    return err.response?.data ?? defaultApiError;
  }

  return defaultApiError;
}
