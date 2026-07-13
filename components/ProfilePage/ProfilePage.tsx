'use client';

import { ReactNode } from 'react';
import { TravellerInfo } from '../TravellerInfo/TravellerInfo';
import { ProfileTabs } from '../ProfileTabs';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import css from './ProfilePage.module.css';

interface ProfilePageProps {
  children: ReactNode;
}

export const ProfilePage = ({ children }: ProfilePageProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null; // або Loader

  return (
    <section className={css.section}>
      <div className={`container ${css.inner}`}>
        <TravellerInfo
          name={user.name}
          avatarUrl={user.avatarUrl}
          articlesAmount={user.articlesAmount ?? 0}
        />

        <ProfileTabs />

        {children}
      </div>
    </section>
  );
};