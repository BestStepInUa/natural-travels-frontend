import { create } from 'zustand';
import { getCategories } from '@/lib/api/clientApi';
import { Category } from '@/types/category';

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,

  fetchCategories: async () => {
    console.log('Attempting to fetch categories...');
    if (get().categories.length > 0) {
      console.log('Categories already in store, retrieving from store.');
      return;
    }
    if (get().isLoading) {
      console.log('Categories are already loading.');
      return;
    }

    set({ isLoading: true });
    try {
      const categories = await getCategories();
      set({ categories });
      console.log('Categories fetched from API.');
    } catch (error) {
      console.error('Помилка завантаження категорій:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
