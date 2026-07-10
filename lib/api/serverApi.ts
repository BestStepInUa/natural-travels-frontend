import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type CheckSessionResponse } from './clientApi';
import { type User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

import { type StoriesResponse } from '@/types/story';
export type StoriesQueryParams = {
  category?: string;
  page?: number;
  perPage?: number;
  type?: 'popular';
};

export async function getAllStories(
  params: StoriesQueryParams = {}
): Promise<StoriesResponse> {
  const { category, page = 1, perPage, type } = params;

  const { data } = await nextServer.get<StoriesResponse>('/stories', {
    params: {
      category,
      page,
      perPage,
      type,
    },
  });

  return data;
}
