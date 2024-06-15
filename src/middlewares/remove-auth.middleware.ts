import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/features/shared/constants';
import { type NextRequest, NextResponse } from 'next/server';

export async function removeAuthMiddleware(request: NextRequest) {
  const cookieSetterResponse = NextResponse.next();

  cookieSetterResponse.cookies.delete(ACCESS_TOKEN_KEY);
  cookieSetterResponse.cookies.delete(REFRESH_TOKEN_KEY);

  return cookieSetterResponse;
}

export function shouldRemoveAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  return (
    pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')
  );
}
