'use client';

import { useRef } from "react";
import { Traveller } from "./TravellersPage";
import { TravellerCard } from "@/components/TravellerCard/TravellerCard";
import css from './page.module.css';

interface TravellersListProps {
  travellers: Traveller[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function TravellersList({ travellers, onLoadMore, hasMore }: TravellersListProps) {
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
              id={traveller.id.toString()}
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