import { nextServer } from './api';
import { User } from '@/types/user';
export type { User };

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
