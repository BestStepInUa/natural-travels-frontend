import { cookies } from 'next/headers';
import axios from 'axios';
import { type CheckSessionResponse } from './clientApi';
import { type User } from '@/types/user';
import { type StoriesResponse, type Story } from '@/types/story';
import { type StoriesQueryParams } from '@/types/story';
import { type TravellersResponse } from '@/types/travellers';
import { type PublicTravellerProfileResponse } from '@/types/user';
import { type Category } from '@/types/category';

const backendApi = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_URL || 'https://natural-travels-backend.onrender.com',
  withCredentials: true,
});

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await backendApi.get<CheckSessionResponse>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await backendApi.get<User>('/auth/me', {
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

  const { data } = await backendApi.get<StoriesResponse>('/stories', {
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
  const { data } = await backendApi.get<TravellersResponse>('/users', {
    params: {
      page,
      perPage: 12,
    },
  });

  return data;
}

export const getPublicTravellerProfile = async (
  travellerId: string,
  page = 1,
  perPage = 6
): Promise<PublicTravellerProfileResponse> => {
  const { data } = await backendApi.get<PublicTravellerProfileResponse>(
    `/users/${travellerId}/public?page=${page}&perPage=${perPage}`
  );

  return data;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await backendApi.get('/categories');

  return data;
}

export const getStoryById = async (storyId: string): Promise<Story> => {
  const { data } = await backendApi.get(`/stories/${storyId}`);
  return data;
};
