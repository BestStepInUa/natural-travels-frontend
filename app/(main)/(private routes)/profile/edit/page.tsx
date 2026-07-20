import { Metadata } from 'next';
import Link from 'next/link';
import ProfileEditForm from '@/components/ProfileEditForm';
import css from './page.module.css';
import PageTitle from "@/components/PageTitle"

export const metadata: Metadata = {
  title: 'Персональна інформація | Природні Мандри',
};

export default function ProfileEditPage() {
  return (
      <section className={css.section}>
        <div className={'container'}>
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

          <PageTitle
            variant="title"
            color="scheme1"
            marginBottom={40}
            align="center"
          >
            Персональна інформація
          </PageTitle>

          <ProfileEditForm />
        </div>
      </section>
  );
}
