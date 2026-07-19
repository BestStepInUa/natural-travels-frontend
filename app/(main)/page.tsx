import Hero from '@/components/Hero';

import Join from '@/components/Join';
import About from '@/components/About';
import PopularStories from '@/components/PopularStories';
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
