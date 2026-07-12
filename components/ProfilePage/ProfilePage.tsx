import { ReactNode } from 'react';
import { TravellerInfo } from '../TravellerInfo/TravellerInfo';
import { ProfileTabs } from '../ProfileTabs';
import css from './ProfilePage.module.css';


interface ProfilePageProps {
  children: ReactNode;
}

export const ProfilePage = ({
  children,
}: ProfilePageProps) => {
  return (
    <section className={css.section}>
      <div className={`container ${css.inner}`}>
      <TravellerInfo
  name="Назар Ткаченко"
  avatarUrl="/default-avatar.png"
  articlesAmount={6}
/>

      <ProfileTabs />

        {children}
        </div>
    </section>
  );
};