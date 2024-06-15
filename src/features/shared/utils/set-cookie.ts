import 'server-only';

import setCookieParser from 'set-cookie-parser';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { type ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export const setCookie = (
  setCookie: string,
  nextCookies: ReadonlyRequestCookies | ResponseCookies,
) => {
  const cookieObject = setCookieParser.parse(
    setCookieParser.splitCookiesString(setCookie),
    { map: true },
  );

  for (const key in cookieObject) {
    if (Object.hasOwn(cookieObject, key)) {
      const cookie = cookieObject[key];

      nextCookies.set(key, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        sameSite: cookie.sameSite,
        expires: cookie.expires,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
      });
    }
  }
};
