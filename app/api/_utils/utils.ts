import { AxiosError, isAxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { parseSetCookie } from 'cookie';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type ApiError = AxiosError<{ error: string }>;

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export function createErrorResponce(error: ApiError) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status }
    );
  }
  logErrorResponse({ message: (error as Error).message });
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

export function setAuthCookiesFromHeaders(
  cookieStore: ReadonlyRequestCookies,
  setCookie?: string | string[]
) {
  if (!setCookie) {
    return false;
  }

  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    const parsed = parseSetCookie(cookieStr);
    const options = {
      expires: parsed.expires,
      path: parsed.path,
      maxAge: parsed.maxAge,
      httpOnly: parsed.httpOnly,
      secure: parsed.secure,
      sameSite: parsed.sameSite,
    };

    if (!parsed.value) continue;

    if (parsed.name === 'accessToken') {
      cookieStore.set(parsed.name, parsed.value, options);
    }

    if (parsed.name === 'refreshToken') {
      cookieStore.set(parsed.name, parsed.value, options);
    }
  }

  return true;
}
