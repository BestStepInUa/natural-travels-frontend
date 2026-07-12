import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { ApiError, createErrorResponce } from '../../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '6';

    const cookieStore = await cookies();

    const res = await api.get('/stories/my-stories', {
      params: {
        page,
        perPage,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}