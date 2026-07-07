import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { ApiError, createErrorResponce } from '../../_utils/utils';

export async function GET() {
  const cookiesStore = await cookies();
  try {
    const { data } = await api.get('/auth/me', {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
