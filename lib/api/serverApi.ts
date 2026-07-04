import { cookies } from 'next/headers';
import { nextServer } from './api';
import { CheckSessionResponse, User } from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async () => {
  const {data} = await nextServer.get<User>('auth/me');
  return data;
}