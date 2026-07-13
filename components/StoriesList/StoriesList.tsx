'use client';
import css from '@/components/StoriesList/StoriesList.module.css';
import StoryCard from '@/components/StoryCard/StoryCard';
import { getStoriesClient } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCategoryStore } from '@/lib/store/categoryStore/categoryStore';

export default function StoriesList() {
  const params = useParams();
  const { categories } = useCategoryStore();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? 'all';

  const categoryId =
    slug === 'all'
      ? undefined
      : categories.find((c) => c.slug === slug)?._id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['stories', categoryId],
    queryFn: ({ pageParam = 1 }) =>
      getStoriesClient({ page: pageParam, perPage: 9, categoryId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.stories.length === 0) {
        return undefined;
      }
      const nextPage = allPages.length + 1;
      return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
  });

  if (status === 'pending') return <p>Завантаження...</p>;
  if (status === 'error') return <p>Помилка завантаження історій.</p>;

  return (
    <div className={css.storiesListContainer}>
      <div className={css.storiesList}>
        {data.pages.map((page) =>
          page.stories.map((story) => (
            <StoryCard
              key={story._id}
              _id={story._id}
              img={story.img}
              title={story.title}
              rate={story.rate}
              ownerId={story.ownerId}
            />
          ))
        )}
      </div>

      {hasNextPage && (
        <button
          className={css.storiesLoadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
        </button>
      )}
    </div>
  );
}
