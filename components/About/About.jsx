import Image from 'next/image';
import css from './About.module.css';

export default function About() {
  return (
    <section className={css.aboutSection}>
      <div className={css.aboutContainer}>
        <div className={css.contentWrapper}>
          <h2 className={css.title}>
            Мандруй екологічно та відкривай нові горизонти
          </h2>

          <p className={css.description}>
            Наш проєкт створений для тих, хто хоче досліджувати Україну
            відповідально. Ми допоможемо знайти унікальні маршрути, які
            поєднують красу природи, локальну культуру та принципи сталого
            туризму.
          </p>

          <ul className={css.benefitList}>
            <li className={css.benefitItem}>
              <h3 className={css.benefitTitle}>Еко-маршрути по Україні</h3>
              <p className={css.benefitText}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </p>
            </li>
            <li className={css.benefitItem}>
              <h3 className={css.benefitTitle}>Практичні екологічні поради</h3>
              <p className={css.benefitText}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів, та
                зробити подорож комфортною й свідомою.
              </p>
            </li>
          </ul>
        </div>
        <picture>
          <source
            srcSet="/About/about-desktop.png"
            media="(min-width: 1440px)"
          />

          <source srcSet="/About/about-tablet.png" media="(min-width: 768px)" />

          <Image
            src="/About/about-mobile.png"
            alt="Екологічні мандри"
            width={335}
            height={410}
            className={css.aboutImage}
          />
        </picture>
      </div>
    </section>
  );
};