'use client';

import  { useState, useEffect } from 'react';
import { TravellersList } from './TravellersList';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import css from './page.module.css';

export interface Traveller {
  id: number;
  name: string;
  articlesCount: number;
  photoUrl: string;
}

export default function TravellersPage() {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTravellers = async (pageNumber: number) => {
    setLoading(true);
    try {
      const fakeData: Traveller[] = [
        { id: 1, name: 'Олександра Бондар', articlesCount: 32, photoUrl: '' },
        { id: 2, name: 'Софія Мельник', articlesCount: 12, photoUrl: '' },
        { id: 3, name: 'Дарина Ковальчук', articlesCount: 19, photoUrl: '' },
        { id: 4, name: 'Олександр Шевченко', articlesCount: 5, photoUrl: '' },
        { id: 5, name: 'Максим Кравченко', articlesCount: 8, photoUrl: '' },
        { id: 6, name: 'Юлія Ткаченко', articlesCount: 15, photoUrl: '' },
        { id: 7, name: 'Артем Мороз', articlesCount: 22, photoUrl: '' },
        { id: 8, name: 'Олена Лисенко', articlesCount: 41, photoUrl: '' },
        { id: 9, name: 'Дмитро Романенко', articlesCount: 3, photoUrl: '' },
        { id: 10, name: 'Анна Петренко', articlesCount: 17, photoUrl: '' },
        { id: 11, name: 'Ігор Клименко', articlesCount: 29, photoUrl: '' },
        { id: 12, name: 'Наталія Козак', articlesCount: 14, photoUrl: '' },
      ];

      const paginatedData = fakeData.map(item => ({
        ...item,
        id: item.id + (pageNumber - 1) * 12,
        name: item.name
      }));

      if (pageNumber === 1) {
        setTravellers(paginatedData);
      } else {
        setTravellers(prev => [...prev, ...paginatedData]);
      }

      if (pageNumber >= 3) setHasMore(false);

    } catch (error) {
      console.error('Помилка при завантаженні даних з БД', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTravellers(1);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTravellers(nextPage);
  };

  return (
    <section className={`${css.mainSection} container`}>
      <PageTitle  align="center" marginBottom={24}>Мандрівники</PageTitle>

      {loading && travellers.length === 0 ? (
        <div className={css.loaderContainer}>
          <div className={css.loader}></div>
        </div>
      ) : (
        <TravellersList
          travellers={travellers}
          onLoadMore={loadMoreData}
          hasMore={hasMore}
        />
      )}
    </section>
  );
};