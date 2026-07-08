import Image from 'next/image';
import css from './AuthHeader.module.css';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className={css.header}>
      <div className="container">
        <Link href="/" className={css.content}>
          <Image src="/icons/logo.svg" alt="icon" width={24}   // указываем ширину
      height={24}  className={css.logo}/>
          <p className={css.textAuthHeader}>Прирордні мандри</p>
        </Link>
      </div>
    </header>
  );
}
