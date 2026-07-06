import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { ApiError, createErrorResponce } from '../_utils/utils';


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();


    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;


    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : '',
      sessionId ? `sessionId=${sessionId}` : '',
    ]
      .filter(Boolean)
      .join('; ');


    const res = await api.post('/api/stories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Cookie: cookieHeader,
      },
    });

    
    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
