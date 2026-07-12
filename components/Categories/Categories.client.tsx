'use client';

import { useRouter } from 'next/navigation';
import css from './Categories.module.css';
import { useEffect } from 'react';
import { useCategoryStore } from '@/lib/store/categoryStore/categoryStore';
import { PageTitle } from '@/components/PageTitle/PageTitle';

type Props = {
  currentSlug: string;
};

export default function CategoriesClient({ currentSlug }: Props) {
  const router = useRouter();
  const { categories, isLoading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading && categories.length === 0)
    return <div>Завантаження категорій...</div>;

  return (
    <div className={css.stories}>
      <PageTitle
        variant="title"
        color="scheme1"
        marginBottom={40}
        align="center"
      >
        Статті
      </PageTitle>
      <select
        className={css.categoryListSelect}
        value={currentSlug}
        onChange={(e) => {
          router.push(`/stories/filter/${e.target.value}`);
        }}
      >
        <option value="all">Всі статті</option>

        {categories.map((category) => (
          <option key={category._id} value={category.slug}>
            {category.category}
          </option>
        ))}
      </select>
    </div>
  );
}
