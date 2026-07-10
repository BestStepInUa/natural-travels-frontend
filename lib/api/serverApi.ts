import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type CheckSessionResponse } from './clientApi';
import { type User } from '@/types/user';

type PublicTravellerProfileResponse = {
  user: User;
  stories: {
    data: unknown[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
};
export const getPublicTravellerProfile = async (
  travellerId: string,
  page = 1,
  perPage = 6
): Promise<PublicTravellerProfileResponse> => {
  const { data } = await nextServer.get<PublicTravellerProfileResponse>(
    `/users/${travellerId}/public?page=${page}&perPage=${perPage}`
  );

  return data;
};

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
