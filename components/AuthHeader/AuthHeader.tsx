import Image from 'next/image';
import css from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.content}>
          <Image src="/icons/logo.svg" alt="icon"   width={100}   // указываем ширину
      height={100}/>
          <p className={css.textAuthHeader}>Прирордні мандри</p>
        </div>
      </div>
    </header>
  );
}
