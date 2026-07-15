import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils';
import { api } from '@/app/api/api';

// Сохранение статьи
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ storyId: string }> }
) {
  try {
    const { storyId } = await context.params; // обязательно await

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : '',
      sessionId ? `sessionId=${sessionId}` : '',
    ].filter(Boolean).join('; ');

    const res = await api.post(`/stories/save/${storyId}`, {}, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}

// Удаление из сохранённых
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ storyId: string }> }
) {
  try {
    const { storyId } = await context.params; // обязательно await

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : '',
      sessionId ? `sessionId=${sessionId}` : '',
    ].filter(Boolean).join('; ');

    const res = await api.delete(`/stories/save/${storyId}`, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return createErrorResponce(error as ApiError);
  }
}
