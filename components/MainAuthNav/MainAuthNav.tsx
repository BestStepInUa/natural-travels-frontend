'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './MainAuthNav.module.css';

export default function MainAuthNav() {
  const pathname = usePathname();
  return (
    <div className="container">
      <div className={css.wraperAuth}>
        <Link
          href="/register"
          className={`${css.blockLoginRegister} ${pathname === '/register' ? css.active : ''}`}
        >
          Реєстрація
        </Link>
        <Link
          href="/login"
          className={`${css.blockLoginRegister} ${pathname === '/login' ? css.active : ''}`}
        >
          Вхід
        </Link>
      </div>
    </div>
  );
}
