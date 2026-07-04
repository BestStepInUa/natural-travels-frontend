// import { cookies } from 'next/headers';
import { nextServer } from './api';
import { CheckSessionResponse, User } from './clientApi';

export const checkServerSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const {data} = await nextServer.get<User>('auth/me');
  return data;
}