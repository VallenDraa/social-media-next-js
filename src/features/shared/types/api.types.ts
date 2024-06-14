export type BaseApiResponse = {
  statusCode: number;
  message: string;
};

export type ApiErrorResponse = BaseApiResponse & {
  error: string;
};

export type ApiSuccessResponse<T> = BaseApiResponse & {
  data: T;
};
