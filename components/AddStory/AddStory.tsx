'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/components/PageTitle/PageTitle';
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
    <div className={`${css.wrapper} container`}>
      <PageTitle variant="title" color="scheme2">
        Створити нову історію
      </PageTitle>

      <AddStoryForm />
    </div>
  );
}
