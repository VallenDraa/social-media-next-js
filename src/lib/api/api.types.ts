export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
};

export type ErrorApiResponse = {
  statusCode: number;
  error: string;
  message: string;
};
