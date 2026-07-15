'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { getSavedStoryIds } from '@/lib/api/storiesApi';

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const setSavedArticles = useAuthStore((state) => state.setSavedArticles);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isSessionValid = await checkSession();

        if (isSessionValid) {
          const [user, savedIds] = await Promise.all([
            getMe(),
            getSavedStoryIds(),
          ]);
          if (user) {
            setUser(user);
            setSavedArticles(savedIds);
          }
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setSavedArticles, clearIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}