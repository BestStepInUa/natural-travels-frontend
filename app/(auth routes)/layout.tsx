'use client';

import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import MainAuthNav from '@/components/MainAuthNav';
import { useEffect } from 'react';
import css from "./page.module.css"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 useEffect(() => {
   document.body.style.backgroundColor = 'var(--color-scheme-1-background)';
   return () => {
     document.body.style.backgroundColor = 'var(--color-scheme-2-background)';
   };
 }, []);

  return (
    <>
      <AuthHeader />
      <div className={`container ${css.responsiveContainer}`}>
        <main>
          <MainAuthNav />
          {children}
        </main>
      </div>
      <AuthFooter />
    </>
  );
}
