import { type NextRequest } from 'next/server';
import {
  refreshTokenMiddleware,
  shouldRefreshCookie,
} from './middlewares/refresh-token.middleware';
import {
  removeAuthMiddleware,
  shouldRemoveAuth,
} from './middlewares/remove-auth.middleware';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (shouldRemoveAuth(request)) {
    return removeAuthMiddleware(request);
  }

  if (shouldRefreshCookie()) {
    return refreshTokenMiddleware(request);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
