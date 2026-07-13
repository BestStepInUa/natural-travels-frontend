import { unstable_cache } from 'next/cache';
import { getCategories } from './serverApi';

export const getCachedCategories = unstable_cache(
  async () => {
    return getCategories();
  },
  ['categories'],
  {
    revalidate: false, // кеш назавжди
  }
);
