'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TravellerInfo } from '../TravellerInfo/TravellerInfo';
import { ProfileTabs } from '../ProfileTabs';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { getMe } from '@/lib/api/clientApi';
import Link from 'next/link';
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
      <div className={`container`}>
        <div className={css.profileRow}>
          <TravellerInfo
            name={user.name}
            avatarUrl={user.avatarUrl}
            articlesAmount={articlesAmount}
          />
          <Link href="/profile/edit" className={css.editButton}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 20h9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Редагувати профіль
          </Link>
        </div>

        <ProfileTabs />

        {children}
      </div>
    </section>
  );
};
