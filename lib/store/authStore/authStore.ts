import { User } from '@/types/user';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuth: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));

export const selectIsAuthenticated = (state: AuthStore) =>
  state.isAuthenticated;
export const selectUser = (state: AuthStore) => state.user;
export const selectSetUser = (state: AuthStore) => state.setUser;
export const selectClearIsAuthenticated = (state: AuthStore) =>
  state.clearIsAuth;
