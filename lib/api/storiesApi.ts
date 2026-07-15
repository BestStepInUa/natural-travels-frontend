import { api as nextServer } from '@/app/api/api';
import { ProfileStoriesResponse, Story } from '@/types/story';

export interface BackendCategory {
  _id: string;
  category: string;
}

export const getStoryById = async (storyId: string) => {
  const res = await nextServer.get(`/stories/${storyId}`);
  return res.data;
};

export const saveStory = async (storyId: string): Promise<void> => {
  await nextServer.post(`/stories/save/${storyId}`);
};

export const unsaveStory = async (storyId: string): Promise<void> => {
  await nextServer.delete(`/stories/save/${storyId}`);
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

export const getSavedStories = async (
  page = 1,
  perPage = 6
): Promise<ProfileStoriesResponse> => {
  const { data } = await nextServer.get<ProfileStoriesResponse>(
    '/stories/saved-stories',
    {
      params: {
        page,
        perPage,
      },
    }
  );

  return data;
};

export const getMyStories = async (
  page = 1,
  perPage = 6
): Promise<ProfileStoriesResponse> => {
  const { data } = await nextServer.get<ProfileStoriesResponse>(
    '/stories/my-stories',
    {
      params: {
        page,
        perPage,
      },
    }
  );

  return data;
};

export const getStoriesByCategory = async (
  categoryId: string,
  perPage: number
): Promise<Story[]> => {
  const res = await nextServer.get('/stories', {
    params: {
      category: categoryId,
      perPage,
      page: 1,
    },
  });
  return res.data.stories;
};
export const getSavedStoryIds = async (): Promise<string[]> => {
  const { data } = await nextServer.get<{ savedArticles: string[] }>(
    '/stories/saved-ids'
  );
  return data.savedArticles;
};