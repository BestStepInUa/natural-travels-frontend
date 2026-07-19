'use client';

import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import MainAuthNav from '@/components/MainAuthNav';
import { useTheme } from '@/components/ThemeContext/ThemeContext';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDark } = useTheme();

  const mainStyle = {
    backgroundColor: isDark ? '#254c24' : '#ffffff',
    minHeight: '100vh',
    transition: 'background-color 0.4s ease',
  };

  return (
    <main style={mainStyle}>
      <AuthHeader />
      <MainAuthNav />
      {children}
      <AuthFooter />
    </main>
  );
}
