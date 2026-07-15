import { User } from '@/lib/api/clientApi';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  savedArticles: string[];
  setUser: (user: User) => void;
  setSavedArticles: (ids: string[]) => void;
  clearIsAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  savedArticles: [],
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  setSavedArticles: (ids: string[]) => {
    set(() => ({ savedArticles: ids }));
  },
  clearIsAuth: () => {
    set(() => ({ user: null, isAuthenticated: false, savedArticles: [] }));
  },
}));