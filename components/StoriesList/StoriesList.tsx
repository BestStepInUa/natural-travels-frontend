import css from '@/components/StoriesList/StoriesList.module.css';
import { type Story } from '@/types/story';
import StoryCard from '@/components/StoryCard/StoryCard';

interface StoriesListProps {
  stories: Story[];
}

export default function StoriesList({ stories }: StoriesListProps) {
  return (
    <div className={css.storiesListContainer}>
      <div className={css.storiesList}>
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
      <button className={css.storiesLoadMore}>Показати ще</button>
    </div>
  );
}
