'use client';

import { useState } from 'react';
import { useSavedStories } from '@/hooks/useSavedStories';
import  StoriesList  from '@/components/StoriesList/StoriesList';
import  MessageNoStories  from '@/components/MessageNoStories';
import  Loader  from '@/components/Loader/Loader';
import  Pagination  from '@/components/Pagination';

export default function SavedStoriesPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useSavedStories(page);

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