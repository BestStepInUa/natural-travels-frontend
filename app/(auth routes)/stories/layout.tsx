import css from '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="stories-page">
      <div className="container">{children}</div>
    </section>
  );
}
