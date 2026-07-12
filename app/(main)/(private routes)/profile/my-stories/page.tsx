'use client';

import { useState } from 'react';
import { useMyStories } from '@/hooks/useMyStories';
import StoriesList from '@/components/StoriesList/StoriesList';
import MessageNoStories from '@/components/MessageNoStories';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination';

export default function MyStoriesPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useMyStories(page);

  if (isPending) return <Loader />;

  if (isError) {
    return <p>Не вдалося завантажити ваші історії.</p>;
  }

  if (!data || !data.data.length) {
    return (
      <MessageNoStories
        text="У вас ще немає власних історій."
        buttonText="Створити історію"
        linkTo="/stories/create"
      />
    );
  }

  return (
     <>
          <StoriesList
            stories={data.data}
          totalPages={data.totalPages}/>

          {data.totalPages > 1 && (
            <Pagination
      onLoadMore={() => setPage((prev) => prev + 1)}
      isLoading={isPending}
      hasMore={data.page < data.totalPages}
    />
          )}
        </>
      );
}