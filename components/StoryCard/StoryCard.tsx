import Image from 'next/image';
import Link from 'next/link';
import SaveIcon from '@/components/StoriesList/SaveIcon';
import css from './StoryCard.module.css';

interface StoryCardProps {
  _id: string;
  img: string;
  title: string;
  rate: number;
  ownerId: {
    _id: string;
    name: string;
  };
}

export default function StoryCard({
  _id,
  img,
  title,
  rate,
  ownerId,
}: StoryCardProps) {
  return (
    <div className={css.storyCard}>
      <Image
        className={css.storyCardImage}
        src={img}
        alt={title}
        width={340}
        height={340}
      />
      <div className={css.storyCardContent}>
        <div className={css.storyCardAuthorContainer}>
          <p className={css.storyCardAuthor}>{ownerId.name}</p>•
          <p className={css.storyCardSaves}>{rate}</p>
          <SaveIcon width={16} height={16} />
        </div>
        <h3 className={css.storyCardTitle}>{title}</h3>
        <div className={css.storyCardButtonWrapper}>
          <Link href={`/stories/${_id}`} className={css.storyCardButton}>
            Переглянути статтю
          </Link>
          <button className={css.storyCardSaveButton}>
            <SaveIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
