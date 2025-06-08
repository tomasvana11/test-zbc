'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setIsServicesOpen(false);
        setIsNewsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? 0 : scrolled ? 16 : 32,
        left: isMobile ? 0 : 16,
        right: isMobile ? 0 : 16,
        zIndex: 1000,
        transition: 'top 0.3s ease',
      }}
    >
      <div
        ref={menuRef}
        style={{
          maxWidth: isMobile ? '100%' : '1392px',
          margin: isMobile ? '0' : '0 auto',
          padding: isMobile ? '16px' : '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: scrolled || isMobile ? 'rgba(35, 35, 35, 0.75)' : 'transparent',
          borderRadius: isMobile ? '0px' : '8px',
          backdropFilter: scrolled || isMobile ? 'blur(20px)' : 'none',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <Link href="/" passHref>
            <a>
              <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
            </a>
          </Link>
        </div>

        {/* Desktop navigace */}
        {!isMobile && (
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

            <li style={{ position: 'relative', cursor: 'pointer' }}>
              <div onClick={() => setOpenDropdown(openDropdown === 'sluzby' ? null : 'sluzby')} style={{ display: 'flex', alignItems: 'center' }}>
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

            <li style={{ position: 'relative', cursor: 'pointer' }}>
              <div onClick={() => setOpenDropdown(openDropdown === 'novinky' ? null : 'novinky')} style={{ display: 'flex', alignItems: 'center' }}>
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
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setOpenDropdown(openDropdown === 'mainMenu' ? null : 'mainMenu')}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#9D6219',
              color: 'white',
              padding: '0 16px',
              border: 'none',
              borderRadius: 4,
              height: 44,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            <img src="/images/menu-icon.svg" alt="Menu icon" style={{ marginRight: 8, height: 20 }} />
            Menu
          </button>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {isMobile && openDropdown === 'mainMenu' && (
        <ul
          id="main-menu-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            backgroundColor: 'rgba(226, 219, 213, 0.9)',
            color: '#232323',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            padding: '8px 0',
            zIndex: 2000,
            listStyle: 'none',
            margin: 0,
          }}
        >
          <li>
            <Link href="/">
              <a style={{ padding: '8px 20px', display: 'block' }}>Domů</a>
            </Link>
          </li>

          <li
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            style={{ padding: '8px 20px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <span>Služby</span>
            <img
              src="/images/menu-chevron-down.svg"
              alt="šipka"
              style={{
                height: 16,
                transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </li>
          {isServicesOpen && (
            <>
              <li>
                <Link href="/sluzby/sluzba-1">
                  <a style={{ padding: '8px 40px', display: 'block' }}>Služba 1</a>
                </Link>
              </li>
              <li>
                <Link href="/sluzby/sluzba-2">
                  <a style={{ padding: '8px 40px', display: 'block' }}>Služba 2</a>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/reference">
              <a style={{ padding: '8px 20px', display: 'block' }}>Reference</a>
            </Link>
          </li>

          <li
            onClick={() => setIsNewsOpen(!isNewsOpen)}
            style={{ padding: '8px 20px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <span>Novinky a vzdělávání</span>
            <img
              src="/images/menu-chevron-down.svg"
              alt="šipka"
              style={{
                height: 16,
                transform: isNewsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </li>
          {isNewsOpen && (
            <>
              <li>
                <Link href="/novinky/novinka-1">
                  <a style={{ padding: '8px 40px', display: 'block' }}>Novinka 1</a>
                </Link>
              </li>
              <li>
                <Link href="/vzdelavani/vzdelavani-1">
                  <a style={{ padding: '8px 40px', display: 'block' }}>Vzdělávání 1</a>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/kontakt">
              <a style={{ padding: '8px 20px', display: 'block' }}>Kontakt</a>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
