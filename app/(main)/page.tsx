import { Hero } from '@/components/Hero/Hero';
import About from '@/components/About/About';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <About />
    </div>
  );
}
