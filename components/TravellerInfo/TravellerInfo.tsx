import Image from 'next/image';
import css from './TravellerInfo.module.css';

interface TravellerInfoProps {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

export default function TravellerInfo ({
  name,
  avatarUrl,
  articlesAmount,
}: TravellerInfoProps) {
  return (
    <div className={`${css.container} ${css.card}`}>
      <Image
        src={avatarUrl}
        alt={name}
        width={113}
        height={113}
        className={css.avatar}
      />
      <div className={css.info}>
        <p className={css.name}>{name}</p>
        <p className={css.articles}>Статей: {articlesAmount}</p>
      </div>
    </div>
  );
};
