'use client';

import { Traveller } from './TravellersPage';
import { TravellerCard } from '@/components/TravellerCard/TravellerCard';
import css from './page.module.css';

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={css.flexContainer}>
      {travellers.map((traveller) => (
        <li key={traveller.id} className={css.cardWrapper}>
          <TravellerCard
            id={traveller.id.toString()}
            name={traveller.name}
            articlesCount={traveller.articlesCount}
            photoUrl={traveller.photoUrl}
          />
        </li>
      ))}
    </ul>
  );
}
