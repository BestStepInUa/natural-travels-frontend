import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError, createErrorResponce } from '../../../_utils/utils';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();

    const backendUrl = `${(process.env.NEXT_BACKEND_API_URL || '').replace(/\/$/, '')}/users/me/avatar`;

    const response = await fetch(backendUrl, {
      method: 'PATCH',
      headers: {
        Cookie: cookieStore.toString(),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
