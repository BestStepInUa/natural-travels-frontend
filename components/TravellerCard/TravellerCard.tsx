import Image from 'next/image';
import Link from 'next/link';
import css from './TravellerCard.module.css';

interface TravellerCardProps {
  id: string ;
  name: string;
  articlesCount: number;
  photoUrl?: string;
}

export const TravellerCard = ({
  id,
  name,
  articlesCount,
  photoUrl,
}: TravellerCardProps) => {
  return (
    <div className={css.card}>
      <Image
        src={photoUrl || '/default-avatar.png'}
        alt={name}
        className={css.photo}
        width={130}
        height={130}
      />

      <div className={css.infoWrapper}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.articlesCount}>Статей: {articlesCount}</p>
      </div>

      <Link href={`/travellers/${id}`} className={css.linkButton}>
        Переглянути профіль
      </Link>
    </div>
  );
};
