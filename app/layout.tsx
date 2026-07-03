import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider';
import AuthProvider from '@/components/AuthProvider';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

import 'modern-normalize';
import './globals.css';

const montserratFont = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Природні Мандри',
  description:
    'Природні Мандри — спільнота еко-мандрівників, де можна відкривати маршрути Україною, читати історії подорожей та ділитися власними враженнями.',
  openGraph: {
    type: 'website',
    url: process.env.NEXT_OG_APP_URL || 'http://localhost:3000',
    title: 'Природні Мандри',
    description:
      'Природні Мандри — спільнота еко-мандрівників, де можна відкривати маршрути Україною, читати історії подорожей та ділитися власними враженнями.',
    siteName: 'Природні Мандри',
    images: [
      {
        url: 'https://ftp.goit.study/img/green-tourism/68498236a100312bea047fe6.webp',
        width: 630,
        height: 630,
        alt: 'Природні Мандри',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={montserratFont.variable}>
      <body>
        <TanStackProvider>
          {/* <AuthProvider> */}
          {/* <Header /> */}
          <main>{children}</main>
          {/* <Footer /> */}
          {/* </AuthProvider> */}
        </TanStackProvider>
      </body>
    </html>
  );
}
