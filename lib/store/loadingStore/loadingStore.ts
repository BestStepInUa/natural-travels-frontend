import { create } from 'zustand';

type LoadingStore = {
  activeRequests: number;
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  activeRequests: 0,
  isLoading: false,
  showLoader: () =>
    set((state) => {
      const nextCount = state.activeRequests + 1;
      return { activeRequests: nextCount, isLoading: nextCount > 0 };
    }),
  hideLoader: () =>
    set((state) => {
      const nextCount = Math.max(0, state.activeRequests - 1);
      return { activeRequests: nextCount, isLoading: nextCount > 0 };
    }),
}));
