import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MenuDemo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: scrolled ? 'red' : 'transparent',
        transition: 'background-color 0.3s ease',
        padding: '10px 20px',
      }}
    >
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/podcast">podcast</Link>
        </li>
        <li>
          <Link href="/reference">reference</Link>
        </li>
        <li>
          <Link href="/kariera">kariera</Link>
        </li>
        <li>
          <Link href="/nas-tym">tym</Link>
        </li>
        <li>
          <Link href="/kontakt">kontakt</Link>
        </li>
        <li>
          <Link href="/sluzby">sluzby</Link>
        </li>
      </ul>
    </nav>
  );
}
