'use client';
import css from '@/components/StoriesList/StoriesList.module.css';
import StoryCard from '@/components/StoryCard/StoryCard';
import { getPublicTravellerProfileClient } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';

type TravellerStoriesListProps = {
  travellerId: string;
};

export default function TravellerStoriesList({
  travellerId,
}: TravellerStoriesListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['traveller-stories', travellerId],
      queryFn: ({ pageParam = 1 }) =>
        getPublicTravellerProfileClient(travellerId, pageParam, 9),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const stories = lastPage.stories?.data ?? [];
        if (stories.length === 0) return undefined;
        const nextPage = allPages.length + 1;
        return nextPage > lastPage.stories.totalPages ? undefined : nextPage;
      },
    });

  if (status === 'pending') return <p>Завантаження...</p>;
  if (status === 'error') return <p>Помилка завантаження історій.</p>;

  return (
    <div className={css.storiesListContainer}>
      <div className={css.storiesList}>
        {data.pages.map((page) =>
          page.stories.data.map((story) => (
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
