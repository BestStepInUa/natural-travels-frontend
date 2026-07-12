import { nextServer } from '@/lib/api/api';
import { User } from '@/types/user';
export type { User };
import { type TravellersResponse } from '@/types/travellers';

export type CheckSessionResponse = {
  success: boolean;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheckSessionResponse>('/auth/session');
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export type StoriesQueryParams = {
  categoryId?: string;
  page?: number;
  perPage?: number;
  type?: 'popular';
};

import { type StoriesResponse } from '@/types/story';

export async function getStoriesClient(
  params: StoriesQueryParams
): Promise<StoriesResponse> {
  const { categoryId, page = 1, perPage, type } = params;

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

export async function getTravellersClient(page = 1) {
  const { data } = await nextServer.get<TravellersResponse>('/users', {
    params: {
      page,
      perPage: 12,
    },
  });

  return data;
}
