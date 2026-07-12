import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllStories, getCategories } from '@/lib/api/serverApi';
import CategoriesClient from './Categories.client';
import Link from 'next/link';
import css from './Categories.module.css';

type CategoriesProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Categories({ params }: CategoriesProps) {
  const queryClient = new QueryClient();

  const categories = await getCategories();

  const resolvedParams = params ? await params : undefined;
  const currentSlug = resolvedParams?.slug?.[0] ?? 'all';

  const categoryId =
    currentSlug === 'all'
      ? undefined
      : categories.find((c) => c.slug === currentSlug)?._id;

  await queryClient.prefetchQuery({
    queryKey: ['stories', categoryId, 1],
    queryFn: () => getAllStories({ page: 1, perPage: 9, categoryId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesClient categories={categories} currentSlug={currentSlug} />
      <ul className={css.categoryList}>
        <li className={css.categoryItem}>
          <Link href="/stories/filter/all" className={css.menuLink}>
            Всі статті
          </Link>
        </li>
        {categories.map((category) => (
          <li className={css.categoryItem} key={category._id}>
            <Link
              href={`/stories/filter/${category.slug}`}
              className={css.categoryItemLink}
            >
              {category.category}
            </Link>
          </li>
        ))}
      </ul>
    </HydrationBoundary>
  );
}
