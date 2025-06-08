'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        backgroundColor: scrolled ? '#c00' : 'transparent',
        color: 'white',
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
        boxSizing: 'border-box',
        justifyContent: 'space-between',
      }}
    >
      {/* LOGO vlevo */}
      <div style={{ flexShrink: 0 }}>
        <Link href="/" passHref>
          <a>
            <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
          </a>
        </Link>
      </div>

      {/* Menu odkazy */}
      <ul
        style={{
          display: 'flex',
          gap: '24px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center',
          fontWeight: '600',
        }}
      >
        <li>
          <Link href="/">Domů</Link>
        </li>

        {/* Dropdown: Služby */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('sluzby')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            Služby
            {/* 👇 Tvoje vlastní SVG šipka */}
            <img src="/images/menu-chevron-down.svg" alt="šipka" style={{ marginLeft: 6, height: 10 }} />
          </div>
          {openDropdown === 'sluzby' && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                padding: '8px 0',
                borderRadius: 4,
                zIndex: 2000,
                minWidth: 160,
              }}
            >
              <li>
                <Link href="/sluzby/sluzba-1">
                  <a style={{ padding: '8px 20px', display: 'block' }}>Služba 1</a>
                </Link>
              </li>
              <li>
                <Link href="/sluzby/sluzba-2">
                  <a style={{ padding: '8px 20px', display: 'block' }}>Služba 2</a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Dropdown: Novinky a vzdělávání */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('novinky')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            Novinky a vzdělávání
            {/* 👇 Tvoje vlastní SVG šipka */}
            <img src="/images/chevron-down.svg" alt="šipka" style={{ marginLeft: 6, height: 10 }} />
          </div>
          {openDropdown === 'novinky' && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                padding: '8px 0',
                borderRadius: 4,
                zIndex: 2000,
                minWidth: 220,
              }}
            >
              <li>
                <Link href="/novinky/novinka-1">
                  <a style={{ padding: '8px 20px', display: 'block' }}>Novinka 1</a>
                </Link>
              </li>
              <li>
                <Link href="/vzdelavani/vzdelavani-1">
                  <a style={{ padding: '8px 20px', display: 'block' }}>Vzdělávání 1</a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/kontakt">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}
