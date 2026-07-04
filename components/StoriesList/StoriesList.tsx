import css from '@/components/StoriesList/StoriesList.module.css';
import Image from 'next/image';
import stories from '@/green-tourism.articles.json';

export default function StoriesList() {
  return (
    <div className={css.storiesList}>
      {stories.map((story) => (
        <div key={story._id.$oid} className={css.storyCard}>
          <Image
            className={css.storyCardImage}
            src={story.img}
            alt={story.title}
            width={340}
            height={340}
          />
          <div className={css.storyCardContent}>
            <div className={css.storyCardAuthorContainer}>
              <p className={css.storyCardAuthor}>{story.ownerId.$oid}</p>
              &bull;
              <p className={css.storyCardSaves}>{story.rate}</p>
              <svg width="16" height="16">
                <use href="#save-icon"></use>
              </svg>
            </div>
            <h3 className={css.storyCardTitle}>{story.title}</h3>
            <div className={css.storyCardButtonWrapper}>
              <button className={css.storyCardButton}>
                Переглянути статтю
              </button>
              <button className={css.storyCardSaveButton}>
                <svg width="24" height="24">
                  <use href="#save-icon"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className={css.storiesLoadMore}>Показати ще</button>
    </div>
  );
}
