import Link from 'next/link';
import css from './TravellerNotFound.module.css';

export default function TravellerNotFound() {
  return (
    <main className={css.main}>
      <div className={`container ${css.wrapper}`}>
        <div className={css.card}>
          <div className={css.icon}>🧭</div>
          <h1 className={css.title}>Такий користувач відсутній</h1>
          <p className={css.subtitle}>
            Можливо, профіль було видалено або посилання застаріле
          </p>
          <Link href="/travellers" className={css.button}>
            До списку мандрівників
          </Link>
        </div>
      </div>
    </main>
  );
}
