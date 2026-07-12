import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type CheckSessionResponse } from './clientApi';
import { type User } from '@/types/user';
import { type StoriesResponse } from '@/types/story';
import { type StoriesQueryParams } from '@/types/story';
import { type TravellersResponse } from '@/types/travellers';
import { Category } from '@/types/category';

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

export async function getAllStories(
  params: StoriesQueryParams = {}
): Promise<StoriesResponse> {
  const { categoryId, page = 1, perPage, type = 'popular' } = params;

  const { data } = await nextServer.get<StoriesResponse>('/stories', {
    params: {
      categoryId,
      page,
      perPage,
      type,
    },
  });

  return data;
}

export async function getTravellers(page = 1) {
  const { data } = await nextServer.get<TravellersResponse>('/users', {
    params: {
      page,
      perPage: 12,
    },
  });

  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await nextServer.get('/categories');

  return data;
}
