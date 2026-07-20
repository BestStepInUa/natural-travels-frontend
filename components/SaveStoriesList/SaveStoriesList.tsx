'use client';
import css from '@/components/MyStoriesList/MyStoriesList.module.css';
import StoryCard from '@/components/StoryCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/storiesApi';
import Loader from '@/components/Loader';
import MessageNoStories from '@/components/MessageNoStories';

export default function SaveStoriesList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['save-stories'],
      queryFn: ({ pageParam = 1 }) => getSavedStories(pageParam),
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

  if (status === 'pending') return <Loader />;
  if (status === 'error') return <p>Помилка завантаження історій.</p>;

  const totalStories = data?.pages.reduce((acc, page) => acc + page.data.length, 0) ?? 0;

  if (totalStories === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій, мершій збережіть вашу першу історію!"
        buttonText="До історій"
        linkTo="/stories"
      />
    );
  }

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
