import { isAxiosError } from 'axios';
import z from 'zod';
import { type ApiErrorResponse } from '@/shared/types/api.types';

export const DEFAULT_ERROR_MESSAGE =
  'An error happened. Please try again later!';

export function getErrorMessage(err: unknown) {
  if (isAxiosError<ApiErrorResponse>(err)) {
    const errResponse = err.response?.data;

    if (isErrorApiResponse(errResponse)) {
      return errResponse.message;
    }

    return err.message;
  }

  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => issue.message);
    return errors.join('\n');
  }

  if (err instanceof Error) {
    return err.message;
  }

  return DEFAULT_ERROR_MESSAGE;
}

export function isErrorApiResponse(
  response: unknown,
): response is ApiErrorResponse {
  if (typeof response !== 'object' || response === null) {
    return false;
  }

  return 'error' in response;
}
