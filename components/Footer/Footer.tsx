import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import css from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${css.footer} container`}>
      <div className={css.footer_wrapper}>
        <div className={css.logo_and_social_wrapper}>
          <Link href="/" className={css.logo} aria-label="Перейти на головну">
            <Image
              src="/icons/logo.svg"
              alt="Природні Мандри"
              width={24}
              height={24}
            />
            <span>
              Природні
              <br />
              Мандри
            </span>
          </Link>
          <ul className={css.socialList} aria-label="Соціальні мережі">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className={css.socialIcon} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className={css.socialIcon} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X(раніше Twitter)"
              >
                <FaXTwitter className={css.socialIcon} />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className={css.socialIcon} />
              </a>
            </li>
          </ul>
        </div>
        <nav className={css.nav} aria-label="Навігація">
          <Link href="/" aria-label="Головна">
            Головна
          </Link>
          <Link href="/stories" aria-label="Статті">
            Статті
          </Link>
          <Link href="/travellers" aria-label="Еко-Мандрівники">
            Еко-Мандрівники
          </Link>
        </nav>
      </div>
      <p className={css.copyright}>
        © {year} Природні Мандри. Усі права захищені.
      </p>
    </footer>
  );
}
