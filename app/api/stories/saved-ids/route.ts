import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { ApiError, createErrorResponce } from '../../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : '',
      sessionId ? `sessionId=${sessionId}` : '',
    ]
      .filter(Boolean)
      .join('; ');

    const res = await api.get('/stories/saved-ids', {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}