import { NextResponse } from 'next/server';
import { api } from '../api';
import { ApiError, createErrorResponce } from '../_utils/utils';

export async function GET() {
  try {
    const response = await api.get('/categories');

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
