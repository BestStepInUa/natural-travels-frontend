import { cookies } from 'next/headers';
import { nextServer } from './api';
import { CheckSessionResponse } from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  return res;
};
