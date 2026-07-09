'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import 'swiper/css';
import StoryCard from '@/components/StoryCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { getPopularStories } from '@/lib/api/storiesApi';
import { useWindowSize } from '@/hooks/useWindowSize';
import css from './PopularStories.module.css';

interface Story {
  _id: string;
  img: string;
  title: string;
  rate: number;
  ownerId: {
    _id: string;
    name: string;
  };
}

const TOTAL_POPULAR = 10;

export const PopularStories = () => {
  const width = useWindowSize();
  const swiperRef = useRef<SwiperType | null>(null);
  const pendingAdvanceRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allStories, setAllStories] = useState<Story[]>([]);

  const perPage = width >= 1440 ? 3 : width >= 768 ? 2 : 1;
  const totalPages = Math.ceil(TOTAL_POPULAR / perPage);

  const allLoaded = currentPage >= totalPages;

  const { isFetching } = useQuery({
    queryKey: ['popular-stories', currentPage, perPage],
    queryFn: async () => {
      const stories = await getPopularStories(currentPage, perPage);
      setAllStories((prev) => {
        const newStories = stories.filter(
          (s: Story) => !prev.find((p: Story) => p._id === s._id)
        );
        return [...prev, ...newStories];
      });
      return stories;
    },
    staleTime: Infinity,
    enabled: !allLoaded,
  });

  useEffect(() => {
    if (pendingAdvanceRef.current) {
      pendingAdvanceRef.current = false;
      swiperRef.current?.slideNext();
    }
  }, [allStories]);

  const handleNext = () => {
    if (!allLoaded) {
      pendingAdvanceRef.current = true;
      setCurrentPage((prev) => prev + 1);
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
        <PageTitle variant="title">Популярні статті</PageTitle>
        <Link
          href="/stories"
          className={`${css.allStoriesBtn} ${css.allStoriesBtnDesktop}`}
        >
          Всі статті
        </Link>
      </div>

      {allStories.length === 0 && isFetching ? (
        <p>Завантаження...</p>
      ) : (
        <Swiper
          modules={[Navigation]}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16, slidesPerGroup: 1 },
            768: { slidesPerView: 2, spaceBetween: 16, slidesPerGroup: 2 },
            1440: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
          }}
        >
          {allStories.map((story) => (
            <SwiperSlide key={story._id}>
              <StoryCard
                _id={story._id}
                img={story.img}
                title={story.title}
                rate={story.rate}
                ownerId={story.ownerId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className={css.navigation}>
        <button className={css.prevBtn} onClick={handlePrev}>
          <FiArrowLeft size={24} />
        </button>
        <button
          className={css.nextBtn}
          onClick={handleNext}
          disabled={isFetching}
        >
          <FiArrowRight size={24} />
        </button>
      </div>

      <Link
        href="/stories"
        className={`${css.allStoriesBtn} ${css.allStoriesBtnMobile}`}
      >
        Всі статті
      </Link>
    </section>
  );
};
