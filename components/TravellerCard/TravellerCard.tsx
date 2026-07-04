import Image from 'next/image';
import css from './TravellerCard.module.css';

interface TravellerCardProps {
  name: string;
  articlesCount: number;
  photoUrl?: string; // Поки заглушка
}

export const TravellerCard = ({
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

      <a href="#" className={css.linkButton}>
        Переглянути профіль
      </a>
    </div>
  );
};
