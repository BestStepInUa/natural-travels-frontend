'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const savedArticles = useAuthStore((state) => state.savedArticles);
  const setSavedArticles = useAuthStore((state) => state.setSavedArticles);
  const queryClient = useQueryClient();

  const isSaved = useMemo(
    () => savedArticles.includes(_id),
    [savedArticles, _id]
  );

  const [currentRate, setCurrentRate] = useState(rate ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await unsaveStory(_id);
        setSavedArticles(savedArticles.filter((id) => id !== _id));
        setCurrentRate((prev) => Math.max(prev - 1, 0));

        if (user) {
          setUser({
            ...user,
            savedArticlesAmount: Math.max(
              (user.savedArticlesAmount ?? 0) - 1,
              0
            ),
          });
        }

        queryClient.setQueryData(
          ['save-stories'],
          (
            oldData:
              | { pages: { data: { _id: string }[] }[]; pageParams: unknown[] }
              | undefined
          ) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: page.data.filter((story) => story._id !== _id),
              })),
            };
          }
        );
      } else {
        await saveStory(_id);
        setSavedArticles([...savedArticles, _id]);
        setCurrentRate((prev) => prev + 1);

        if (user) {
          setUser({
            ...user,
            savedArticlesAmount: (user.savedArticlesAmount ?? 0) + 1,
          });
        }
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
          <p className={css.storyCardSaves}>{currentRate}</p>
          <SaveIcon width={16} height={16} />
        </div>
        <h3 className={css.storyCardTitle}>{title}</h3>
        <div className={css.storyCardButtonWrapper}>
          <Link href={`/stories/${_id}`} className={css.storyCardButton}>
            Переглянути статтю
          </Link>
          <button
            className={`${css.storyCardSaveButton} ${
              isSaved ? css.storyCardSaveButtonActive : ''
            }`}
            onClick={handleSaveClick}
            disabled={isLoading}
            aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти статтю'}
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