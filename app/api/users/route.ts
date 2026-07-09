import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { ApiError, createErrorResponce } from '../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');

    const params: Record<string, string> = {};
    if (page) params.page = page;
    if (perPage) params.perPage = perPage;

    const res = await api.get('/api/users', { params });
    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
