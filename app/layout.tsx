import { Montserrat } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider';
import AuthProvider from '@/components/AuthProvider';
import Cursor from '@/components/Cursor';
import ThemeProvider from '@/components/ThemeContext';

import 'modern-normalize';
import './globals.css';

const montserratFont = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={montserratFont.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <ThemeProvider>
              <Cursor />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
