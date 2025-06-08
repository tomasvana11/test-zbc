'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderDropdownItems = (items) => (
    <ul style={{ listStyle: 'none', paddingLeft: 16 }}>
      {items.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}><a style={{ display: 'block', padding: '8px 0' }}>{label}</a></Link>
        </li>
      ))}
    </ul>
  );

  const dropdownItems = {
    sluzby: [
      { href: '/sluzby/sluzba-1', label: 'Služba 1' },
      { href: '/sluzby/sluzba-2', label: 'Služba 2' },
    ],
    novinky: [
      { href: '/novinky/novinka-1', label: 'Novinka 1' },
      { href: '/vzdelavani/vzdelavani-1', label: 'Vzdělávání 1' },
    ]
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        ref={menuRef}
        style={{
          backgroundColor: isMobile || scrolled ? '#232323' : 'transparent',
          color: '#E2DBD5',
          padding: '16px',
          borderRadius: isMobile ? 0 : 8,
          maxWidth: isMobile ? '100%' : '1392px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <a><img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} /></a>
        </Link>

        {!isMobile ? (
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
            <li><Link href="/">Domů</Link></li>
            <li onMouseEnter={() => setOpenDropdown('sluzby')} onMouseLeave={() => setOpenDropdown(null)}>
              <span>Služby</span>
              {openDropdown === 'sluzby' && renderDropdownItems(dropdownItems.sluzby)}
            </li>
            <li><Link href="/reference">Reference</Link></li>
            <li onMouseEnter={() => setOpenDropdown('novinky')} onMouseLeave={() => setOpenDropdown(null)}>
              <span>Novinky a vzdělávání</span>
              {openDropdown === 'novinky' && renderDropdownItems(dropdownItems.novinky)}
            </li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              backgroundColor: '#9D6219',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              padding: '0 16px',
              height: 44,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <img src="/images/menu-icon.svg" alt="menu" style={{ height: 20, marginRight: 8 }} />
            Menu
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ backgroundColor: '#E2DBD5', padding: '16px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/"><a>Domů</a></Link></li>
            <li>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'sluzby' ? null : 'sluzby')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}
              >Služby</button>
              {openDropdown === 'sluzby' && renderDropdownItems(dropdownItems.sluzby)}
            </li>
            <li><Link href="/reference"><a>Reference</a></Link></li>
            <li>
              <button
                onClick={() => setOpenDropdown(openDropdown === 'novinky' ? null : 'novinky')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}
              >Novinky a vzdělávání</button>
              {openDropdown === 'novinky' && renderDropdownItems(dropdownItems.novinky)}
            </li>
            <li><Link href="/kontakt"><a>Kontakt</a></Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}