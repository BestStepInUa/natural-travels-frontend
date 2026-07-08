import { nextServer } from './api';

export interface BackendTraveller {
  _id: string;
  name: string;
  avatarUrl?: string;
  articlesAmount: number;
}

export const getTravellers = async (
  page: number,
  perPage: number
): Promise<BackendTraveller[]> => {
  const res = await nextServer.get('/users', {
    params: { page, perPage },
  });

  return res.data.users;
};
