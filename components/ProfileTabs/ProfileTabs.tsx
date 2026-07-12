'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './ProfileTabs.module.css';

export const ProfileTabs = () => {
  const pathname = usePathname();

  const isSavedStories = pathname.startsWith('/profile/saved-stories');
  const isMyStories = pathname.startsWith('/profile/my-stories');

  return (
    <div className={css.tabs_wrapper}>
    <nav className={css.tabs}>
      <Link
        href="/profile/saved-stories"
        className={`${css.tab} ${isSavedStories ? css.active : ''}`}
      >
        Збережені історії
      </Link>

      <Link
        href="/profile/my-stories"
        className={`${css.tab} ${isMyStories ? css.active : ''}`}
      >
        Мої історії
      </Link>
    </nav>
    </div>
  );
};