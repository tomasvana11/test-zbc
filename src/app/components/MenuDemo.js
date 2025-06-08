'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MenuDemo({ ArrowIcon }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const DefaultArrow = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginLeft: 4 }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const Arrow = ArrowIcon || DefaultArrow;

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
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

        // Hlavní úprava:
        justifyContent: 'space-between',
      }}
    >
      {/* Logo vlevo */}
      <div style={{ flexShrink: 0 }}>
        <Link href="/" passHref>
          <a style={{ display: 'inline-block' }}>
            <img src="/path-to-your-logo.svg" alt="Logo" style={{ height: 40 }} />
          </a>
        </Link>
      </div>

      {/* Odkazy vpravo */}
      <ul
        style={{
          display: 'flex',
          gap: '24px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center',
          fontWeight: '600',
          cursor: 'default',
        }}
      >
        <li>
          <Link href="/">
            <a style={{ color: 'inherit', textDecoration: 'none' }}>Domů</a>
          </Link>
        </li>

        {/* Dropdown Služby */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('sluzby')}
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              userSelect: 'none',
              color: 'inherit',
            }}
          >
            Služby <Arrow />
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
                listStyle: 'none',
                padding: '8px 0',
                margin: 0,
                borderRadius: '4px',
                minWidth: '180px',
                zIndex: 2000,
              }}
            >
              <li>
                <Link href="/sluzby/sluzba-1">
                  <a style={{ display: 'block', padding: '8px 20px', color: 'black', textDecoration: 'none' }}>
                    Služba 1
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sluzby/sluzba-2">
                  <a style={{ display: 'block', padding: '8px 20px', color: 'black', textDecoration: 'none' }}>
                    Služba 2
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Dropdown Novinky a vzdělávání */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('novinky')}
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              userSelect: 'none',
              color: 'inherit',
            }}
          >
            Novinky a vzdělávání <Arrow />
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
                listStyle: 'none',
                padding: '8px 0',
                margin: 0,
                borderRadius: '4px',
                minWidth: '220px',
                zIndex: 2000,
              }}
            >
              <li>
                <Link href="/novinky/novinka-1">
                  <a style={{ display: 'block', padding: '8px 20px', color: 'black', textDecoration: 'none' }}>
                    Novinka 1
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/vzdelavani/vzdelavani-1">
                  <a style={{ display: 'block', padding: '8px 20px', color: 'black', textDecoration: 'none' }}>
                    Vzdělávání 1
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/kontakt">
            <a style={{ color: 'inherit', textDecoration: 'none' }}>Kontakt</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
