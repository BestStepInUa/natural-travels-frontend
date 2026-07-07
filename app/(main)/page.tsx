import { Hero } from '@/components/Hero/Hero';
// // import css from './page.module.css';

import Join from '@/components/Join';
import About from '@/components/About/About';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <About />
      <Join />
    </div>
  );
}
