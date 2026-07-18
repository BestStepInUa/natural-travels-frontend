import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { LeafLoader } from '@/components/LeafLoader';
import type { Metadata } from 'next';
import '../globals.css';

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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <LeafLoader />
    </>
  );
}
