import { api as nextServer } from '@/app/api/api';
import { ProfileStoriesResponse, Story } from '@/types/story';

const baseURL = process.env.NEXT_BACKEND_API_URL;

export interface BackendCategory {
  _id: string;
  category: string;
}

export const getStoryById = async (storyId: string) => {
  const res = await nextServer.get(`/stories/${storyId}`, { baseURL });
  return res.data;
};

export const saveStory = async (storyId: string): Promise<void> => {
  await nextServer.post(`/api/stories/save/${storyId}`);
};

export const unsaveStory = async (storyId: string): Promise<void> => {
  await nextServer.delete(`/stories/save/${storyId}`);
};

export const getPopularStories = async (page: number, perPage: number) => {
  const res = await nextServer.get('/api/stories', {
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

export const getSavedStories = async (
  page = 1,
  perPage = 6
): Promise<ProfileStoriesResponse> => {
  const { data } = await nextServer.get<ProfileStoriesResponse>(
    '/api/stories/saved-stories',
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
    '/api/stories/my-stories',
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
  const res = await nextServer.get('/api/stories', {
    baseURL,
    params: {
      category: categoryId,
      perPage,
      page: 1,
    },
  });
  return res.data.stories;
};
