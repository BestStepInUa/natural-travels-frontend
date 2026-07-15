'use client';

import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { saveStory, unsaveStory } from '@/lib/api/storiesApi';
import styles from './SaveStory.module.css';

const Loader = () => <span>Завантаження...</span>;

interface SaveStoryProps {
  storyId: string;
  onOpenModal: () => void;
}

export default function SaveStory({ storyId, onOpenModal }: SaveStoryProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const savedArticles = useAuthStore((state) => state.savedArticles);
  const setSavedArticles = useAuthStore((state) => state.setSavedArticles);

  const isSaved = useMemo(
    () => savedArticles.includes(storyId),
    [savedArticles, storyId]
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      onOpenModal();
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await unsaveStory(storyId);
        setSavedArticles(savedArticles.filter((id) => id !== storyId));

        if (user) {
          setUser({
            ...user,
            savedArticlesAmount: Math.max(
              (user.savedArticlesAmount ?? 0) - 1,
              0
            ),
          });
        }
      } else {
        await saveStory(storyId);
        setSavedArticles([...savedArticles, storyId]);

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
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Збережіть собі історію</h2>
      <p className={styles.description}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>
      <button
        className={styles.button}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader />
        ) : isSaved ? (
          'Видалити зі збережених'
        ) : (
          'Зберегти'
        )}
      </button>
    </div>
  );
}