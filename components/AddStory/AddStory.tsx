'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import AddStoryForm from '../AddStoryForm';
import css from './AddStory.module.css';

export default function AddStory() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className={css.section}>
      <div className='container'>
        <PageTitle variant="title" color="scheme2">
          Створити нову історію
        </PageTitle>

        <AddStoryForm />
      </div>
    </section>
  );
}
