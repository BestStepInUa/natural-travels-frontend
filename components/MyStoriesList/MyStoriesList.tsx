'use client';
import css from '@/components/MyStoriesList/MyStoriesList.module.css';
import StoryCard from '@/components/StoryCard/StoryCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { getMyStories } from '@/lib/api/storiesApi';

export default function MyStoriesList() {
  const user = useAuthStore((state) => state.user);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['my-stories'],
      queryFn: ({ pageParam = 1 }) =>
        getMyStories(pageParam),
      initialPageParam: 1,

      staleTime: 0,
      gcTime: 0,


      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.data.length === 0) {
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
          page.data.map((story) => (
            <StoryCard
              key={story._id}
              _id={story._id}
              img={story.img}
              title={story.title}
              rate={story.rate}
              ownerId={story.ownerId}
              ownerNameFallback={user?.name}
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
