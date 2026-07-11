import { nextServer } from './api';

// Перевизначаємо baseURL для кожного запиту тут — прибираємо /api,
// не чіпаючи спільний api.ts (там baseURL включає /api за замовчуванням,
// а бекенд зараз очікує шляхи БЕЗ /api)
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface BackendCategory {
  _id: string;
  category: string;
}

// Отримати одну історію
export const getStoryById = async (storyId: string) => {
  const res = await nextServer.get(`/stories/${storyId}`, { baseURL });
  return res.data;
};

export const saveStory = async (storyId: string): Promise<void> => {
  await nextServer.post(`/stories/saved/${storyId}`, null, { baseURL });
};

export const unsaveStory = async (storyId: string): Promise<void> => {
  await nextServer.delete(`/stories/saved/${storyId}`, { baseURL });
};

export const getPopularStories = async (page: number, perPage: number) => {
  const res = await nextServer.get('/stories', {
    baseURL,
    params: {
      type: 'popular',
      perPage,
      page,
    },
  });
  return res.data.stories;
};

export const getCategories = async () => {
  const response = await nextServer.get<BackendCategory[]>('/categories', {
    baseURL,
  });
  return response.data;
};
