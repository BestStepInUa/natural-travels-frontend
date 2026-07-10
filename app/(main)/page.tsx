import { Hero } from '@/components/Hero/Hero';
// // import css from './page.module.css';

import Join from '@/components/Join';
import About from '@/components/About/About';
import { PopularStories } from '@/components/PopularStories/PopularStories';
import { OurTravellers } from '@/components/OurTravellers/OurTravellers';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <PopularStories/>
      <About />
      <OurTravellers />
      <Join />
    </div>
  );
}
