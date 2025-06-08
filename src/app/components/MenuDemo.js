'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Scroll barva
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Klik mimo zavře dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        marginTop: '32px',
        zIndex: 1000,
        backgroundColor: scrolled ? '#c00' : 'transparent',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        ref={menuRef}
        style={{
          maxWidth: '1392px',
          margin: '0 auto',
          padding: '0 16px',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo vlevo */}
        <div style={{ flexShrink: 0 }}>
          <Link href="/" passHref>
            <a>
              <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
            </a>
          </Link>
        </div>

        {/* Odkazy vpravo */}
        <ul
          style={{
            display: 'flex',
            gap: '44px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            alignItems: 'center',
            fontWeight: 'normal',
            color: '#E2DBD5',
          }}
        >
          <li>
            <Link href="/">Domů</Link>
          </li>

          {/* Dropdown: Služby */}
          <li style={{ position: 'relative', cursor: 'pointer' }}>
            <div onClick={() => toggleDropdown('sluzby')} style={{ display: 'flex', alignItems: 'center' }}>
              Služby
              <img src="/images/menu-chevron-down.svg" alt="šipka" style={{ marginLeft: 8, height: 24 }} />
            </div>
            {openDropdown === 'sluzby' && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'rgba(226, 219, 213, 0.8)',
                  color: '#232323',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '8px 0',
                  borderRadius: 4,
                  zIndex: 2000,
                  minWidth: 160,
                  listStyle: 'none',
                  margin: 0,
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

          <li>
            <Link href="/reference">Reference</Link>
          </li>

          {/* Dropdown: Novinky a vzdělávání */}
          <li style={{ position: 'relative', cursor: 'pointer' }}>
            <div onClick={() => toggleDropdown('novinky')} style={{ display: 'flex', alignItems: 'center' }}>
              Novinky a vzdělávání
              <img src="/images/menu-chevron-down.svg" alt="šipka" style={{ marginLeft: 8, height: 24 }} />
            </div>
            {openDropdown === 'novinky' && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'rgba(226, 219, 213, 0.8)',
                  color: '#232323',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '8px 0',
                  borderRadius: 4,
                  zIndex: 2000,
                  minWidth: 220,
                  listStyle: 'none',
                  margin: 0,
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
      </div>
    </div>
  );
}
