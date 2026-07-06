import { cookies } from 'next/headers';
import { nextServer } from './api';
import { type CheckSessionResponse, type User } from './clientApi';

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
