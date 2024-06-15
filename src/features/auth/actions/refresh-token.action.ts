'use server';

import { getErrorMessage } from '@/features/shared/utils/error-parser';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { env } from '@/config/env';
import { type ApiSuccessResponse } from '@/features/shared/types/api.types';
import { REFRESH_TOKEN_KEY } from '@/features/shared/constants';

export async function refreshToken(cookiesStore: ReadonlyRequestCookies) {
  try {
    const response = await fetch(
      new URL(`auth/refresh-token/cookie`, env.NEXT_PUBLIC_API_URL),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `${REFRESH_TOKEN_KEY}=${cookiesStore.get(REFRESH_TOKEN_KEY)?.value};`,
        },
      },
    );

    const json = (await response.json()) as ApiSuccessResponse<{
      accessToken: string;
    }>;

    if (!response.ok) {
      throw new Error(json.message);
    }

    const setCookieStr = response.headers.get('set-cookie');

    if (!setCookieStr) {
      throw new Error('No cookie found in the response');
    }

    return setCookieStr;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
