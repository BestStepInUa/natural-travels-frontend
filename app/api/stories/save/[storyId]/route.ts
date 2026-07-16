import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { ApiError, createErrorResponce } from '../../../_utils/utils';

function getCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const accessToken = cookieStore.get('accessToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  return [
    accessToken ? `accessToken=${accessToken}` : '',
    sessionId ? `sessionId=${sessionId}` : '',
  ]
    .filter(Boolean)
    .join('; ');
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> }
) {
  try {
    const { storyId } = await params;
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const res = await api.post(
      `/stories/save/${storyId}`,
      {},
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> }
) {
  try {
    const { storyId } = await params;
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const res = await api.delete(`/stories/save/${storyId}`, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
