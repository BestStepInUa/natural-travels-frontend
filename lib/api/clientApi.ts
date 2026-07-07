import { nextServer } from './api';
import { User } from '@/types/user';

export type CheckSessionResponse = {
  success: boolean;
};

export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('auth/login', data);
  return res.data;
};
