'use client';
import Link from 'next/link';
import { useState } from 'react';

const ArrowDown = () => (
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

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        height: '60px',
        backgroundColor: 'transparent',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
      }}
      id="main-nav"
    >
      {/* Logo vlevo */}
      <div style={{ marginRight: '40px' }}>
        <Link href="/" passHref>
          <a>
            {/* Vlož svůj SVG kód loga sem nebo použij img */}
            <img src="/path-to-your-logo.svg" alt="Logo" style={{ height: 40 }} />
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
        }}
      >
        <li>
          <Link href="/">
            <a>Domů</a>
          </Link>
        </li>

        {/* Služby dropdown */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('sluzby')}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}
          >
            Služby <ArrowDown />
          </div>

          {openDropdown === 'sluzby' && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
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
                  <a style={{ display: 'block', padding: '8px 20px' }}>Služba 1</a>
                </Link>
              </li>
              <li>
                <Link href="/sluzby/sluzba-2">
                  <a style={{ display: 'block', padding: '8px 20px' }}>Služba 2</a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Reference */}
        <li>
          <Link href="/reference">
            <a>Reference</a>
          </Link>
        </li>

        {/* Novinky a vzdělávání dropdown */}
        <li style={{ position: 'relative' }}>
          <div
            onClick={() => toggleDropdown('novinky')}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}
          >
            Novinky a vzdělávání <ArrowDown />
          </div>

          {openDropdown === 'novinky' && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: 'white',
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
                <Link href="/blog">
                  <a style={{ display: 'block', padding: '8px 20px' }}>Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/podcast">
                  <a style={{ display: 'block', padding: '8px 20px' }}>Podcast</a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Kontakt */}
        <li>
          <Link href="/kontakt">
            <a>Kontakt</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
