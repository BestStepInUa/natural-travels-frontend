import Image from 'next/image';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import css from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.inner}>
        <div className={css.content}>
          <PageTitle marginBottom={24} color="scheme2">
            Відкрий Україну заново — еко-мандри для натхнення
          </PageTitle>

          <p className={css.text}>
            Подорожуй екологічно, відкривай заповідні місця, гори та річки
            України. Ми зібрали маршрути, які допоможуть побачити красу природи
            без шкоди для неї.
          </p>

          <a href="#join" className={css.button}>
            Доєднатись до мандрів
          </a>
        </div>

        <div className={css.imageWrapper}>
          <Image
            src="/hero.jpg"
            alt="Гори та природа України"
            fill
            priority
            sizes="(min-width: 1440px) 620px, (min-width: 768px) 50vw, 100vw"
            className={css.image}
          />
        </div>
      </div>
    </section>
  );
};