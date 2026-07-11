import { nextServer } from './api';

// Перевизначаємо baseURL для кожного запиту тут — прибираємо /api,
// не чіпаючи спільний api.ts
const baseURL = process.env.NEXT_PUBLIC_API_URL;

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
    baseURL,
    params: { page, perPage },
  });

  return res.data.users;
};
