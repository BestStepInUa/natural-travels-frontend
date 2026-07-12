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
    if (get().categories.length > 0 || get().isLoading) return;

    set({ isLoading: true });
    try {
      const categories = await getCategories();
      set({ categories });
    } catch (error) {
      console.error('Помилка завантаження категорій:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
