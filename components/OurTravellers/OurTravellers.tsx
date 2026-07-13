'use client';

import { useState, useRef, useEffect } from 'react';
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

const GRID_CONFIG = {
  mobile: { cols: 1, rows: 3, slidesPerGroup: 1, spaceBetween: 16 },
  tablet: { cols: 2, rows: 2, slidesPerGroup: 1, spaceBetween: 24 },
  desktop: { cols: 4, rows: 1, slidesPerGroup: 4, spaceBetween: 24 },
} as const;

const breakpoints: { [width: number]: SwiperOptions } = {
  320: {
    slidesPerView: GRID_CONFIG.mobile.cols,
    slidesPerGroup: GRID_CONFIG.mobile.slidesPerGroup,
    spaceBetween: GRID_CONFIG.mobile.spaceBetween,
    grid: { rows: GRID_CONFIG.mobile.rows, fill: 'row' },
  },
  768: {
    slidesPerView: GRID_CONFIG.tablet.cols,
    slidesPerGroup: GRID_CONFIG.tablet.slidesPerGroup,
    spaceBetween: GRID_CONFIG.tablet.spaceBetween,
    grid: { rows: GRID_CONFIG.tablet.rows, fill: 'row' },
  },
  1440: {
    slidesPerView: GRID_CONFIG.desktop.cols,
    slidesPerGroup: GRID_CONFIG.desktop.slidesPerGroup,
    spaceBetween: GRID_CONFIG.desktop.spaceBetween,
    grid: { rows: GRID_CONFIG.desktop.rows },
  },
};

export const OurTravellers = () => {
  const width = useWindowSize();
  const swiperRef = useRef<SwiperType | null>(null);
  // Запам'ятовуємо, скільки карток було ПЕРЕД довантаженням — щоб
  // після нього прогорнути точно на цю позицію, а не на фіксований
  // крок. Критично, бо бекенд іноді повертає дублікати на межі
  // сторінок, і реальна кількість нових унікальних карток може бути
  // меншою за очікуваний крок
  const pendingTargetRef = useRef<number | null>(null);
  const [fetchIndex, setFetchIndex] = useState(0);
  const [allTravellers, setAllTravellers] = useState<BackendTraveller[]>([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const config =
    width >= 1440
      ? GRID_CONFIG.desktop
      : width >= 768
      ? GRID_CONFIG.tablet
      : GRID_CONFIG.mobile;

  const step = config.slidesPerGroup * config.rows;
  const visibleCount = config.cols * config.rows;

  const limit = fetchIndex === 0 ? visibleCount : step;
  const skip = fetchIndex === 0 ? 0 : visibleCount + step * (fetchIndex - 1);

  const remainingAfterFirst = TOTAL_TRAVELLERS - visibleCount;
  const totalFetches =
    remainingAfterFirst <= 0 ? 1 : 1 + Math.ceil(remainingAfterFirst / step);

  const allLoaded = fetchIndex + 1 >= totalFetches;

  const { isFetching } = useQuery({
    queryKey: ['our-travellers', skip, limit],
    queryFn: async () => {
      const page = skip / limit + 1;
      const travellers = await getTravellers(page, limit);
      setAllTravellers((prev) => {
        if (!travellers) return prev;
        const newTravellers = travellers.filter(
          (t) => !prev.find((p) => p._id === t._id)
        );
        return [...prev, ...newTravellers];
      });
      return travellers || [];
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (pendingTargetRef.current !== null && swiperRef.current) {
      // Swiper Grid сам визначає, до якої колонки належить слайд
      // з таким індексом — ділити на rows тут НЕ потрібно
      swiperRef.current.slideTo(pendingTargetRef.current);
      pendingTargetRef.current = null;
    }

    if (swiperRef.current) {
      setIsEnd(swiperRef.current.isEnd);
      setIsBeginning(swiperRef.current.isBeginning);
    }
  }, [allTravellers]);

  const syncNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const isNextDisabled = isFetching || (allLoaded && isEnd);

  const handleNext = () => {
    if (!allLoaded) {
      pendingTargetRef.current = allTravellers.length;
      setFetchIndex((prev) => prev + 1);
      return;
    }

    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <section className={css.section}>
      <div className={css.header}>
        <PageTitle variant="traveller">Наші Мандрівники</PageTitle>
        <Link
          href="/travellers"
          className={`${css.allTravellersBtn} ${css.allTravellersBtnDesktop}`}
        >
          Всі мандрівники
        </Link>
      </div>

      <div className={css.swiperWrapper}>
        {allTravellers.length === 0 && isFetching ? (
          <p>Завантаження...</p>
        ) : (
          <Swiper
            modules={[Navigation, Grid]}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncNavState(swiper);
            }}
            onSlideChange={syncNavState}
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
      </div>

      <div className={css.navigation}>
        <button
          className={css.prevBtn}
          onClick={handlePrev}
          disabled={isBeginning}
          aria-label="Попередні мандрівники"
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          className={css.nextBtn}
          onClick={handleNext}
          disabled={isNextDisabled}
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
