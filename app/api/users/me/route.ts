import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { ApiError, createErrorResponce } from '../../_utils/utils';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const { data } = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
