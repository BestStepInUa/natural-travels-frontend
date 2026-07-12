import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/storiesApi';

export const useSavedStories = (
  page: number,
  perPage = 6,
) => {
  return useQuery({
    queryKey: ['saved-stories', page, perPage],
    queryFn: () => getSavedStories(page, perPage),
  });
};