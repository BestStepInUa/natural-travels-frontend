import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { parseCookie } from 'cookie';

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }
  if (refreshToken) {
    const apiRes = await api.get('auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parseCookie(cookieStr);

        const options = {
          expires: parsed.expires ? new Date(parsed.expires) : undefined,
          path: parsed.path,
          maxAge: Number(parsed['maxAge']),
        };

        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
      }

      return NextResponse.json({success: true});
    }
  }
  return NextResponse.json({seccion:false})
}
