'use client';

import { useState, useEffect } from 'react';
import TravellersList from './TravellersList';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import css from './page.module.css';
import { getTravellersClient } from '@/lib/api/clientApi';
import { Traveller } from '@/types/travellers';

// export interface Traveller {
//   id: number;
//   name: string;
//   articlesCount: number;
//   photoUrl: string;
// }

export default function TravellersPage() {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTravellers = async (pageNumber: number) => {
    setLoading(true);

    try {
      const data = await getTravellersClient(pageNumber);

      if (pageNumber === 1) {
        setTravellers(data.users);
      } else {
        setTravellers((prev) => [...prev, ...data.users]);
      }

      setTravellers((prev) => {
        const merged = [...prev, ...data.users];

        return merged.filter(
          (user, index, arr) =>
            arr.findIndex((u) => u._id === user._id) === index
        );
      });

      setHasMore(pageNumber < data.totalPages);
    } catch (error) {
      console.error('Помилка при завантаженні даних', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchTravellers(1);
    };
    init();
  }, []);

  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTravellers(nextPage);
  };

  return (
    <section className={`${css.mainSection} container`}>
      <PageTitle align="center" marginBottom={24}>
        Мандрівники
      </PageTitle>

      {loading && travellers.length === 0 ? (
        <div className={css.loaderContainer}>
          <div className={css.loader}></div>
        </div>
      ) : (
        <>
          <TravellersList travellers={travellers} />

          {hasMore && (
            <div className={css.paginationContainer}>
              <button
                type="button"
                onClick={loadMoreData}
                className={css.loadMoreBtn}
              >
                Показати ще
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
