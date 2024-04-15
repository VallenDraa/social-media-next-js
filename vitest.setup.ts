/* eslint-disable @typescript-eslint/naming-convention */
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from '@/__tests__/msw';

beforeAll(() => {
  server.listen();

  vi.mock('next/font/google', () => ({
    Space_Mono: () => ({
      style: { fontFamily: 'mocked' },
      className: 'mocked',
    }),
  }));
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
