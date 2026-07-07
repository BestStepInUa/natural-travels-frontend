'use client';

import React, { useRef } from "react";
import { Traveller } from "./TravellersPage";
import { TravellerCard } from "@/components/TravellerCard/TravellerCard";
import css from './page.module.css';

interface TravellersListProps {
  travellers: Traveller[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export const TravellersList: React.FC<TravellersListProps> = ({ travellers, onLoadMore, hasMore }) => {
  const listTopRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    onLoadMore();
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={listTopRef} className={css.listContainer}>
      <div className={css.flexContainer}>
        {travellers.map((traveller) => (
          <div key={traveller.id} className={css.cardWrapper}>
          <TravellerCard
            name={traveller.name}
            articlesCount={traveller.articlesCount}
            photoUrl={traveller.photoUrl}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={css.paginationContainer}>
          <button
            type='button'
            onClick={handleLoadMore}
            className={css.loadMoreBtn}
          >
            Показати ще
          </button>
        </div>
      )}
    </div>
  );
};