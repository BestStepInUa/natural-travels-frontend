import { nextServer } from './api';

export type CheckSessionResponse = {
  success: boolean;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  userName: string;
  photoUrl?: string;
  createAt: Date;
  updateAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
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
