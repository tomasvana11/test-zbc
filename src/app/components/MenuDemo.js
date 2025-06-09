'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const menuRef = useRef();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function checkSizes() {
      setIsMobile(window.innerWidth <= 640);
      setIsTabletOrMobile(window.innerWidth <= 1024);
    }
    checkSizes();
    window.addEventListener('resize', checkSizes);
    return () => window.removeEventListener('resize', checkSizes);
  }, []);

  const wrapperStyle = {
    position: 'fixed',
    top: isMobile ? 0 : scrolled ? 16 : 32,
    left: isMobile ? 0 : 16,
    right: isMobile ? 0 : 16,
    zIndex: 1000,
    transition: 'top 0.3s ease',
  };

  const containerStyle = {
    maxWidth: isMobile ? '100%' : '1392px',
    margin: isMobile ? 0 : '0 auto',
    padding: isMobile ? 16 : 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: scrolled ? 'rgba(35, 35, 35, 0.75)' : 'transparent',
    borderRadius: isMobile ? 0 : 8,
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
  };

  const menuButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#9D6219',
    borderRadius: 4,
    height: 44,
    padding: '0 16px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    fontWeight: '600',
    fontSize: 16,
  };

  const iconStyle = {
    marginRight: 8,
    height: 20,
    width: 20,
  };

  return (
    <div style={wrapperStyle}>
      <div ref={menuRef} style={containerStyle}>
        {/* Logo vlevo */}
        <div style={{ flexShrink: 0 }}>
          <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/" passHref>
            <a>
              <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
            </a>
          </Link>
        </div>

        {isTabletOrMobile ? (
          <>
            <button
              onClick={() => toggleDropdown('mainMenu')}
              style={menuButtonStyle}
              aria-expanded={openDropdown === 'mainMenu'}
              aria-controls="main-menu-dropdown"
            >
              <img src="/images/menu-icon.svg" alt="Menu icon" style={iconStyle} />
              Menu
            </button>

            {openDropdown === 'mainMenu' && (
              <ul
                id="main-menu-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'rgba(226, 219, 213, 0.9)',
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
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/" prefetch={false}> 
                    <a style={{ padding: '8px 20px', display: 'block' }}>Domů</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/sluzby">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Komplexní finanční plán</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/kontrola-smluv">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Kontrola smluv</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/reference">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Reference</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/blog">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/podcast">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Podcast</a>
                  </Link>
                </li>
                <li>
                  <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/kontakt">
                    <a style={{ padding: '8px 20px', display: 'block' }}>Kontakt</a>
                  </Link>
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul
            style={{
              display: 'flex',
              gap: 44,
              listStyle: 'none',
              padding: 0,
              margin: 0,
              alignItems: 'center',
              fontWeight: 'normal',
              color: '#E2DBD5',
            }}
          >
            <li>
              <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/">Domů</Link>
            </li>

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
                    minWidth: 200,
                    listStyle: 'none',
                    margin: 0,
                  }}
                >
                  <li>
                    <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/sluzby">
                      <a style={{ padding: '8px 20px', display: 'block' }}>Komplexní finanční plán</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/kontrola-smluv">
                      <a style={{ padding: '8px 20px', display: 'block' }}>Kontrola smluv</a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/reference">Reference</Link>
            </li>

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
                    minWidth: 200,
                    listStyle: 'none',
                    margin: 0,
                  }}
                >
                  <li>
                    <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/blog">
                      <a style={{ padding: '8px 20px', display: 'block' }}>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/podcast">
                      <a style={{ padding: '8px 20px', display: 'block' }}>Podcast</a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="https://test-zbc-tomas-vanas-projects.vercel.app/kontakt">Kontakt</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
