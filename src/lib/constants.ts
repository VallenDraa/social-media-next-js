import { type ErrorApiResponse } from './api';

export const unknownErrorMessage =
  'oops an unknown error happened, please try again later!';

export const defaultApiError: ErrorApiResponse = {
  statusCode: 520,
  error: 'Unknown Error',
  message: unknownErrorMessage,
};
