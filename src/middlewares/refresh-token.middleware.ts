import { refreshToken } from '@/features/auth/actions/refresh-token.action';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/features/shared/constants';
import { setCookie } from '@/features/shared/utils/set-cookie';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function refreshTokenMiddleware(request: NextRequest) {
  const cookiesStore = cookies();

  try {
    const cookieSetterResponse = NextResponse.next();
    const setAccessTokenCookie = await refreshToken(cookiesStore);

    setCookie(setAccessTokenCookie, cookieSetterResponse.cookies);

    return cookieSetterResponse;
  } catch (error) {
    // !TODO: Handle the refresh token error properly
    console.log('🚀 ~ refreshTokenMiddleware ~ error:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export function shouldRefreshCookie() {
  const cookiesStore = cookies();

  const hasRefreshToken = cookiesStore.has(REFRESH_TOKEN_KEY);
  const isAccessTokenMissing = !cookiesStore.has(ACCESS_TOKEN_KEY);

  return hasRefreshToken && isAccessTokenMissing;
}
