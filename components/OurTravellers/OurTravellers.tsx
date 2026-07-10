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
  const pendingAdvanceRef = useRef(false);
  const [fetchIndex, setFetchIndex] = useState(0);
  const [allTravellers, setAllTravellers] = useState<BackendTraveller[]>([]);

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
        const newTravellers = travellers.filter(
          (t) => !prev.find((p) => p._id === t._id)
        );
        return [...prev, ...newTravellers];
      });
      return travellers;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (pendingAdvanceRef.current) {
      pendingAdvanceRef.current = false;
      swiperRef.current?.slideNext();
    }
  }, [allTravellers]);

  const handleNext = () => {
    if (!allLoaded) {
      pendingAdvanceRef.current = true;
      setFetchIndex((prev) => prev + 1);
      return;
    }

    if (swiperRef.current?.isEnd) {
      swiperRef.current?.slideTo(0);
    } else {
      swiperRef.current?.slideNext();
    }
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
