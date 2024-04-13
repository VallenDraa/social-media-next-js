import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get('/resource', () =>
    HttpResponse.json(
      { hello: 'world' },
      { status: 200, statusText: 'Hello World' },
    ),
  ),
];
