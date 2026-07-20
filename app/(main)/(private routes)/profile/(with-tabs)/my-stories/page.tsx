'use client';

import { useMyStories } from '@/hooks/useMyStories';
import MessageNoStories from '@/components/MessageNoStories';
import Loader from '@/components/Loader';
import MyStoriesList from '@/components/MyStoriesList';

export default function MyStoriesPage() {
  const { data, isPending, isError } = useMyStories(1);

  if (isPending) return <Loader />;

  if (isError) {
    return <p>Не вдалося завантажити ваші історії.</p>;
  }

  if (!data || !data.data.length) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Створити історію"
        linkTo="/stories/new"
      />
    );
  }

  return <MyStoriesList />;
}
