import { isAxiosError } from 'axios';
import z from 'zod';
import { type ApiErrorResponse } from '@/features/shared/types/api.types';

export const DEFAULT_ERROR_MESSAGE =
  'An error happened. Please try again later!';

export const DEFAULT_ERROR_TYPE = 'Error';

export class ServerActionError extends Error {
  constructor(public response: ApiErrorResponse) {
    super(response.message);
  }

  get errObj() {
    return this.response;
  }
}

export function makeServerActionError(err: unknown) {
  if (isAxiosError<ApiErrorResponse>(err)) {
    const errResponse = err.response?.data;

    if (isErrorApiResponse(errResponse)) {
      return new ServerActionError(errResponse);
    }

    return new ServerActionError({
      error: DEFAULT_ERROR_TYPE,
      message: err.message,
      statusCode: Number(err.code),
    });
  }

  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => issue.message);
    const errorMessages = errors.join('\n');

    return new ServerActionError({
      error: DEFAULT_ERROR_TYPE,
      message: errorMessages,
      statusCode: 500,
    });
  }

  if (err instanceof Error) {
    return new ServerActionError({
      error: DEFAULT_ERROR_TYPE,
      message: err.message,
      statusCode: 500,
    });
  }

  return new ServerActionError({
    error: DEFAULT_ERROR_TYPE,
    message: DEFAULT_ERROR_MESSAGE,
    statusCode: 500,
  });
}

export function getErrorMessage(err: unknown) {
  if (err instanceof ServerActionError) {
    return err.message;
  }

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
