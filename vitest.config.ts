import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      '**/node_modules/**',
      './src/__tests__/e2e',
      './src/__tests__/msw',
    ],
    setupFiles: './vitest.setup.ts',
    coverage: { provider: 'v8' },
  },
});
