// import './globals.css';
// import Header from '@/components/Header/Header';
// import Footer from '../components/Footer/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      {/* <Header /> */}
      <main className="container">{children}</main>
      {/* <Footer /> */}
    </body>
  );
}
