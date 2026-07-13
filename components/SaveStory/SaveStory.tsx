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
  const { isAuthenticated, user } = useAuthStore();

  const isSaved = useMemo(
    () => user?.savedArticles?.includes(storyId) ?? false,
    [user, storyId]
  );

  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const saved = manualOverride ?? isSaved;

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      onOpenModal();
      return;
    }

    setIsLoading(true);
    try {
      if (saved) {
        await unsaveStory(storyId);
        setManualOverride(false);
      } else {
        await saveStory(storyId);
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

  console.log('user:', user);
  console.log('user.savedArticles:', user?.savedArticles);
  console.log('storyId:', storyId);
  console.log('isSaved:', isSaved);

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
        {isLoading ? <Loader /> : saved ? 'Видалити зі збережених' : 'Зберегти'}
      </button>
    </div>
  );
}
