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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const perPage = width >= 1440 ? 3 : width >= 768 ? 2 : 1;
  const totalPages = Math.ceil(TOTAL_POPULAR / perPage);

  const displayedStories = allStories.slice(0, TOTAL_POPULAR);

  const { isFetching } = useQuery({
    queryKey: ['popular-stories', currentPage, perPage],
    queryFn: async () => {
      const stories = await getPopularStories(currentPage, perPage);
      setAllStories((prev) => {
        if (!stories) return prev;
        const newStories = stories.filter(
          (s: Story) => !prev.find((p: Story) => p._id === s._id)
        );
        return [...prev, ...newStories];
      });
      return stories || [];
    },
    staleTime: 0,
    enabled: currentPage <= totalPages,
  });

  useEffect(() => {
    if (pendingAdvanceRef.current) {
      pendingAdvanceRef.current = false;
      swiperRef.current?.slideNext();
    }

    if (swiperRef.current) {
      setIsEnd(swiperRef.current.isEnd);
      setIsBeginning(swiperRef.current.isBeginning);
    }
  }, [displayedStories]);

  const syncNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const isNextDisabled = isFetching || (currentPage >= totalPages && isEnd);

  const handleNext = () => {
    if (currentPage < totalPages) {
      pendingAdvanceRef.current = true;
      setCurrentPage((prev) => prev + 1);
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
        <PageTitle variant="title">Популярні статті</PageTitle>
        <Link
          href="/stories/filter/all"
          className={`${css.allStoriesBtn} ${css.allStoriesBtnDesktop}`}
        >
          Всі статті
        </Link>
      </div>

      <div className={css.swiperWrapper}>
        {displayedStories.length === 0 && isFetching ? (
          <p>Завантаження...</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncNavState(swiper);
            }}
            onSlideChange={syncNavState}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16, slidesPerGroup: 1 },
              768: { slidesPerView: 2, spaceBetween: 16, slidesPerGroup: 2 },
              1440: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
            }}
          >
            {displayedStories.map((story) => (
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
      </div>

      <div className={css.navigation}>
        <button
          className={css.prevBtn}
          onClick={handlePrev}
          disabled={isBeginning}
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          className={css.nextBtn}
          onClick={handleNext}
          disabled={isNextDisabled}
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
