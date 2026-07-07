'use client';
import Link from 'next/link';
import css from './Join.module.css';
import { useAuthStore } from '@/lib/store/authStore/authStore';

const Join = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <section className={css.joinSection}>
      <div className={css.joinWrapper}>
        <div className={css.content}>
          <h2 className={css.title}>
            Приєднуйся до спільноти свідомих мандрівників
          </h2>
          <p className={css.description}>
            Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
            внеском у збереження природи. Тут ти знайдеш однодумців, поради для
            сталих мандрів та натхнення для нових маршрутів Україною.
          </p>
          <Link
            href={isAuthenticated ? '/profile' : '/register'}
            className={css.joinButton}
          >
            {isAuthenticated ? 'Мій профіль' : 'Зареєструватися'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Join;
