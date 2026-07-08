'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import type { Swiper as SwiperType, SwiperOptions } from 'swiper/types';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/grid';
import { TravellerCard } from '@/components/TravellerCard/TravellerCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { getTravellers, type BackendTraveller } from '@/lib/api/usersApi';
import { useWindowSize } from '@/hooks/useWindowSize';
import css from './OurTravellers.module.css';

const TOTAL_TRAVELLERS = 12;

// Візуальна розкладка Grid для Swiper
const breakpoints: { [width: number]: SwiperOptions } = {
  // Мобільна: 1 колонка × 3 рядки, крок = вся колонка (3 картки)
  320: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grid: { rows: 3, fill: 'row' },
  },
  // Планшет: 2 колонки × 2 рядки видно, крок = 1 колонка (2 картки)
  768: {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 24,
    grid: { rows: 2, fill: 'row' },
  },
  // Десктоп: 4 колонки × 1 рядок, крок = всі 4 колонки
  1440: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24,
    grid: { rows: 1 },
  },
};

export const OurTravellers = () => {
  const width = useWindowSize();
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTravellers, setAllTravellers] = useState<BackendTraveller[]>([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  // мобільна — крок = ціла колонка (3), планшет — одна колонка з двох (2), десктоп — весь ряд (4)
  const perPage = width >= 1440 ? 4 : width >= 768 ? 2 : 3;
  const totalPages = Math.ceil(TOTAL_TRAVELLERS / perPage);

  const { isFetching } = useQuery({
    queryKey: ['our-travellers', currentPage, perPage],
    queryFn: async () => {
      const travellers = await getTravellers(currentPage, perPage);
      setAllTravellers((prev) => {
        const newTravellers = travellers.filter(
          (t) => !prev.find((p) => p._id === t._id)
        );
        return [...prev, ...newTravellers];
      });
      return travellers;
    },
    staleTime: Infinity,
    enabled: !reachedEnd,
  });

  const handleNext = () => {
    if (allTravellers.length >= TOTAL_TRAVELLERS) {
      setReachedEnd(true);
      swiperRef.current?.slideTo(0);
      return;
    }
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    if (reachedEnd) {
      setReachedEnd(false);
    }
    swiperRef.current?.slidePrev();
  };

  return (
    <section className={css.section}>
      <div className={css.header}>
        <PageTitle variant="title">Наші Мандрівники</PageTitle>
        <Link
          href="/travellers"
          className={`${css.allTravellersBtn} ${css.allTravellersBtnDesktop}`}
        >
          Всі мандрівники
        </Link>
      </div>

      {allTravellers.length === 0 && isFetching ? (
        <p>Завантаження...</p>
      ) : (
        <Swiper
          modules={[Navigation, Grid]}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={breakpoints}
        >
          {allTravellers.map((traveller) => (
            <SwiperSlide key={traveller._id}>
              <TravellerCard
                id={traveller._id}
                name={traveller.name}
                articlesCount={traveller.articlesAmount}
                photoUrl={traveller.avatarUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className={css.navigation}>
        <button
          className={css.prevBtn}
          onClick={handlePrev}
          aria-label="Попередні мандрівники"
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          className={css.nextBtn}
          onClick={handleNext}
          disabled={isFetching}
          aria-label="Наступні мандрівники"
        >
          <FiArrowRight size={24} />
        </button>
      </div>

      <Link
        href="/travellers"
        className={`${css.allTravellersBtn} ${css.allTravellersBtnMobile}`}
      >
        Всі мандрівники
      </Link>
    </section>
  );
};
