import { setupServer } from 'msw/node';
import { handlers } from './test';

export const server = setupServer(...handlers);
