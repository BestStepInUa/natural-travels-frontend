import { useQuery } from '@tanstack/react-query';
import { getMyStories } from '@/lib/api/storiesApi';

export const useMyStories = (page: number) => {
  return useQuery({
    queryKey: ['my-stories', page],
    queryFn: () => getMyStories(page),
  });
};