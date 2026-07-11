'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import css from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handlePointerMove = (evt: PointerEvent) => {
      cursor.style.translate = `${evt.clientX}px ${evt.clientY}px`;
    };

    const handleMouseLeave = () => {
      cursor.style.display = 'none';
    };

    const handleMouseEnter = () => {
      cursor.style.display = 'block';
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className={css.cursor}>
      <Image
        src="/icons/logo.svg"
        alt="Cursor"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
