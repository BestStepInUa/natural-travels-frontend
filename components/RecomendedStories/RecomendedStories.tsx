'use client';

import { useQuery } from '@tanstack/react-query';
import StoryCard from '@/components/StoryCard';
import { getStoriesByCategory } from '@/lib/api/storiesApi';
import { useWindowSize } from '@/hooks/useWindowSize';
import css from './RecomendedStories.module.css';

interface RecomendedStoriesProps {
  categoryId: string;
  currentStoryId: string;
}

export default function RecomendedStories({
  categoryId,
  currentStoryId,
}: RecomendedStoriesProps) {
  const width = useWindowSize();

  const visibleCount = width >= 1440 ? 3 : width >= 768 ? 2 : 1;

  const { data, isFetching } = useQuery({
    queryKey: ['recommended-stories', categoryId, visibleCount],
    queryFn: () => getStoriesByCategory(categoryId, visibleCount + 1),
    enabled: Boolean(categoryId),
    staleTime: Infinity,
  });

  const stories = (data ?? [])
    .filter((story) => story._id !== currentStoryId)
    .slice(0, visibleCount);

  if (!isFetching && stories.length === 0) {
    return null;
  }

  return (
    <section className={css.section}>
      <h2 className={css.title}>
        Вам також сподобається
      </h2>

      {isFetching ? (
        <p>Завантаження...</p>
      ) : (
        <div className={css.list}>
          {stories.map((story) => (
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
      )}
    </section>
  );
}
