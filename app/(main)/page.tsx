// // import css from './page.module.css';

import Join from '@/components/Join';
import About from '@/components/About/About';

export default function Home() {
  return (
    <div className="container">
      <About />
      <Join />
    </div>
  );
}
