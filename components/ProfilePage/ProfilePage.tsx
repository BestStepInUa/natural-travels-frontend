'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TravellerInfo } from '../TravellerInfo/TravellerInfo';
import { ProfileTabs } from '../ProfileTabs';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { getMe } from '@/lib/api/clientApi';
import css from './ProfilePage.module.css';

interface ProfilePageProps {
  children: ReactNode;
}

export const ProfilePage = ({ children }: ProfilePageProps) => {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const refreshUser = async () => {
      const updatedUser = await getMe();
      setUser(updatedUser);
    };

    refreshUser();
  }, [setUser]);

  if (!user) return null;

  const isSavedStories = pathname.startsWith('/profile/saved-stories');

  const articlesAmount = isSavedStories
    ? (user.savedArticlesAmount ?? 0)
    : (user.storiesCount ?? 0);

  return (
    <section className={css.section}>
      <div className={`container ${css.inner}`}>
        <TravellerInfo
          name={user.name}
          avatarUrl={user.avatarUrl}
          articlesAmount={articlesAmount}
        />

        <ProfileTabs />

        {children}
      </div>
    </section>
  );
};