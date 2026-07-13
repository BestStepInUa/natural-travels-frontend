'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import SaveIcon from '@/components/StoriesList/SaveIcon';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { saveStory, unsaveStory } from '@/lib/api/storiesApi';
import css from './StoryCard.module.css';

interface StoryCardProps {
  _id: string;
  img: string;
  title: string;
  rate?: number;
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
  const { isAuthenticated, user } = useAuthStore();

  const isSaved = useMemo(
    () => user?.savedArticles?.includes(_id) ?? false,
    [user, _id]
  );

  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const saved = manualOverride ?? isSaved;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (saved) {
        await unsaveStory(_id);
        setManualOverride(false);
      } else {
        await saveStory(_id);
        setManualOverride(true);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не вдалося зберегти історію. Спробуйте ще раз.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <button
            className={`${css.storyCardSaveButton} ${
              saved ? css.storyCardSaveButtonActive : ''
            }`}
            onClick={handleSaveClick}
            disabled={isLoading}
            aria-label={saved ? 'Видалити зі збережених' : 'Зберегти статтю'}
          >
            <SaveIcon width={24} height={24} />
          </button>
        </div>
      </div>

      <ErrorWhileSavingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
