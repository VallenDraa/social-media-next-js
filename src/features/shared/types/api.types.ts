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

export type PaginatedApiResponse<T> = {
  data: T;
  metadata: {
    currentPage: number;
    lastPage: number;
    limit: number;
    total: number;
  };
};
