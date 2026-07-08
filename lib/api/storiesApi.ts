import { nextServer } from './api';

export interface BackendCategory {
  _id: string;
  category: string;
}

export const getStoryById = async (storyId: string) => {
  const res = await nextServer.get(`/stories/${storyId}`);
  return res.data;
};

export const saveStory = async (storyId: string): Promise<void> => {
  await nextServer.post(`/stories/saved/${storyId}`);
};

export const unsaveStory = async (storyId: string): Promise<void> => {
  await nextServer.delete(`/stories/saved/${storyId}`);
};

export const getPopularStories = async (page: number, perPage: number) => {
  const res = await nextServer.get('/stories', {
    params: {
      type: 'popular',
      perPage,
      page,
    },
  });
  return res.data.stories;
};

export const getCategories = async () => {
  const response = await nextServer.get<BackendCategory[]>('/categories');
  return response.data;
};
