'use client';

import { useRouter } from 'next/navigation';
import css from './Categories.module.css';
import { Category } from '@/types/category';
import { PageTitle } from '@/components/PageTitle/PageTitle';

type Props = {
  categories: Category[];
  currentSlug: string;
};

export default function CategoriesClient({ categories, currentSlug }: Props) {
  const router = useRouter();

  return (
    <div className={css.stories}>
      <PageTitle variant="title" color="scheme1" marginBottom={40} align="center">
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
