'use client';
import css from '@/components/StoriesList/StoriesList.module.css';
import { type Story } from '@/types/story';
import StoryCard from '@/components/StoryCard/StoryCard';
import { useState } from 'react';
import { getStoriesClient } from '@/lib/api/clientApi';

interface StoriesListProps {
  stories: Story[];
  totalPages: number;
  categoryId?: string;
}

export default function StoriesList({
  stories,
  totalPages,
  categoryId,
}: StoriesListProps) {
  const [storiesList, setStoriesList] = useState(stories);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreData = async () => {
    if (page >= totalPages || isLoading) return;

    try {
      setIsLoading(true);

      const nextPage = page + 1;

      const response = await getStoriesClient({
        page: nextPage,
        perPage: 9,
        categoryId,
      });

      setStoriesList((prevStories) => {
        const merged = [...prevStories, ...response.stories];

        return merged.filter(
          (story, index, self) =>
            index === self.findIndex((item) => item._id === story._id)
        );
      });

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.storiesListContainer}>
      <div className={css.storiesList}>
        {storiesList.map((story) => (
          <StoryCard
            key={story._id}
            _id={story._id}
            img={story.img}
            title={story.title}
            rate={story.rate}
            ownerId={story.ownerId}
          />
        ))}
      </div>

      {page < totalPages && (
        <button
          className={css.storiesLoadMore}
          onClick={loadMoreData}
          disabled={page >= totalPages}
        >
          {isLoading ? 'Завантаження...' : 'Показати ще'}
        </button>
      )}
    </div>
  );
}
