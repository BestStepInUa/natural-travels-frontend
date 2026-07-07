import { nextServer } from './api';

// Отримати одну історію
export const getStoryById = async (storyId: string) => {
  const res = await nextServer.get(`/stories/${storyId}`);
  return res.data;
};

// Зберегти історію
export const saveStory = async (storyId: string): Promise<void> => {
  await nextServer.post(`/stories/saved/${storyId}`);
};

// Видалити зі збережених
export const unsaveStory = async (storyId: string): Promise<void> => {
  await nextServer.delete(`/stories/saved/${storyId}`);
};
