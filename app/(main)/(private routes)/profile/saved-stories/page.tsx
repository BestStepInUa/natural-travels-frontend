'use client';

import { useSavedStories } from '@/hooks/useSavedStories';

import MessageNoStories from '@/components/MessageNoStories';
import Loader from '@/components/Loader/Loader';
import SaveStoriesList from '@/components/SaveStoriesList/SaveStoriesList';

export default function SavedStoriesPage() {
  const { data, isPending, isError } = useSavedStories(1);

  if (isPending) return <Loader />;

  if (isError) {
    return <p>Не вдалося завантажити збережені історії.</p>;
  }

  if (!data || data.data.length === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій."
        buttonText="Переглянути історії"
        linkTo="/stories"
      />
    );
  }

  return <SaveStoriesList />;
}
