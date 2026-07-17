import { Metadata } from 'next';
import Link from 'next/link';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Персональна інформація | Природні Мандри',
};

export default function ProfileEditPage() {
  return (
    <main>
      <div className={'container'}>
        <div className={css.wrapper}>

          <Link href="/profile" className={css.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Повернутися до профілю
          </Link>

          <h1 className={css.title}>Персональна інформація</h1>
          {/* <p className={css.subtitle}>
            Ці дані бачать інші мандрівники на вашій сторінці
          </p> */}
          <ProfileEditForm />
        </div>
      </div>
    </main>
  );
}
