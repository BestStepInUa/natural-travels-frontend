import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '6';

    const res = await api.get(
      `/users/${id}/public?page=${page}&perPage=${perPage}`
    );

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
