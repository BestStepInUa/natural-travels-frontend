'use client';

import { Traveller } from '@/types/travellers';
import TravellerCard from '@/components/TravellerCard';
import css from './page.module.css';

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={css.flexContainer}>
      {travellers.map((traveller) => (
        <li key={traveller._id} className={css.cardWrapper}>
          <TravellerCard
            id={traveller._id}
            name={traveller.name}
            articlesCount={traveller.articlesAmount}
            photoUrl={traveller.avatarUrl}
          />
        </li>
      ))}
    </ul>
  );
}
