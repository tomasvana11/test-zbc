/*
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

  const mobileLinkStyle = {
    padding: '8px 20px',
    display: 'block',
    color: '#232323',
    textDecoration: 'none',
  };

  const baseUrl = 'https://www.zabohatsicesko.cz';

  return (
    <div style={wrapperStyle}>
      <div ref={menuRef} style={containerStyle}>
        <div style={{ flexShrink: 0 }}>
          <Link href={`${baseUrl}/`} >
            <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
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
                  <Link href={`${baseUrl}/`} prefetch={false} style={mobileLinkStyle}>
                    Domů
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/sluzby`} style={mobileLinkStyle}>
                    Komplexní finanční plán
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/kontrola-smluv`} style={mobileLinkStyle}>
                    Kontrola smluv
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/nas-tym`} style={mobileLinkStyle}>
                    Náš tým
                  </Link>
                </li>
               
                <li>
                  <Link href={`${baseUrl}/reference`} style={mobileLinkStyle}>
                    Reference
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/kariera`} style={mobileLinkStyle}>
                    Kariéra
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/blog`} style={mobileLinkStyle}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/podcast`} style={mobileLinkStyle}>
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/kontakt`} style={mobileLinkStyle}>
                    Kontakt
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
              <Link href={`${baseUrl}/`} style={{ color: '#E2DBD5', textDecoration: 'none' }}>
                Domů
              </Link>
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
                    <Link href={`${baseUrl}/sluzby`} style={mobileLinkStyle}>
                      Komplexní finanční plán
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/kontrola-smluv`} style={mobileLinkStyle}>
                      Kontrola smluv
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href={`${baseUrl}/nas-tym`} style={{ color: '#E2DBD5', textDecoration: 'none' }}>
                Náš tým
              </Link>
            </li>

            <li>
              <Link href={`${baseUrl}/reference`} style={{ color: '#E2DBD5', textDecoration: 'none' }}>
                Reference
              </Link>
            </li>
            <li>
              <Link href={`${baseUrl}/kariera`} style={{ color: '#E2DBD5', textDecoration: 'none' }}>
                Kariéra
              </Link>
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
                    <Link href={`${baseUrl}/blog`} style={mobileLinkStyle}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/podcast`} style={mobileLinkStyle}>
                      Podcast
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href={`${baseUrl}/kontakt`} style={{ color: '#E2DBD5', textDecoration: 'none' }}>
                Kontakt
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
  */
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function MenuDemo() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
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

  // Desktop link style s hover underline
  const getDesktopLinkStyle = (linkName) => ({
    color: '#E2DBD5',
    textDecoration: hoveredLink === linkName ? 'underline' : 'none',
    textUnderlineOffset: '4px',
    transition: 'text-decoration 0.2s ease',
  });

  // Mobile/dropdown link style s hover underline
  const getMobileLinkStyle = (linkName) => ({
    padding: '8px 20px',
    display: 'block',
    color: '#232323',
    textDecoration: hoveredLink === linkName ? 'underline' : 'none',
    textUnderlineOffset: '4px',
    transition: 'text-decoration 0.2s ease',
  });

  // Dropdown trigger style
  const getDropdownTriggerStyle = (linkName) => ({
    display: 'flex',
    alignItems: 'center',
    color: '#E2DBD5',
    textDecoration: hoveredLink === linkName ? 'underline' : 'none',
    textUnderlineOffset: '4px',
    transition: 'text-decoration 0.2s ease',
    cursor: 'pointer',
  });

  const baseUrl = 'https://www.zabohatsicesko.cz';

  return (
    <div style={wrapperStyle}>
      <div ref={menuRef} style={containerStyle}>
        <div style={{ flexShrink: 0 }}>
          <Link href={`${baseUrl}/`}>
            <img src="/images/menu-zbc-logo-l.svg" alt="Logo" style={{ height: 32 }} />
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
                  <Link 
                    href={`${baseUrl}/`} 
                    style={getMobileLinkStyle('mobile-home')}
                    onMouseEnter={() => setHoveredLink('mobile-home')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Domů
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/sluzby`} 
                    style={getMobileLinkStyle('mobile-sluzby')}
                    onMouseEnter={() => setHoveredLink('mobile-sluzby')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Komplexní finanční plán
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/kontrola-smluv`} 
                    style={getMobileLinkStyle('mobile-kontrola')}
                    onMouseEnter={() => setHoveredLink('mobile-kontrola')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Kontrola smluv
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/nas-tym`} 
                    style={getMobileLinkStyle('mobile-tym')}
                    onMouseEnter={() => setHoveredLink('mobile-tym')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Náš tým
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/reference`} 
                    style={getMobileLinkStyle('mobile-reference')}
                    onMouseEnter={() => setHoveredLink('mobile-reference')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Reference
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/kariera`} 
                    style={getMobileLinkStyle('mobile-kariera')}
                    onMouseEnter={() => setHoveredLink('mobile-kariera')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Kariéra
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/blog`} 
                    style={getMobileLinkStyle('mobile-blog')}
                    onMouseEnter={() => setHoveredLink('mobile-blog')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/podcast`} 
                    style={getMobileLinkStyle('mobile-podcast')}
                    onMouseEnter={() => setHoveredLink('mobile-podcast')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`${baseUrl}/kontakt`} 
                    style={getMobileLinkStyle('mobile-kontakt')}
                    onMouseEnter={() => setHoveredLink('mobile-kontakt')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Kontakt
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
              <Link 
                href={`${baseUrl}/`} 
                style={getDesktopLinkStyle('home')}
                onMouseEnter={() => setHoveredLink('home')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Domů
              </Link>
            </li>

            <li style={{ position: 'relative' }}>
              <div 
                onClick={() => toggleDropdown('sluzby')} 
                style={getDropdownTriggerStyle('sluzby-dropdown')}
                onMouseEnter={() => setHoveredLink('sluzby-dropdown')}
                onMouseLeave={() => setHoveredLink(null)}
              >
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
                    <Link 
                      href={`${baseUrl}/sluzby`} 
                      style={getMobileLinkStyle('dropdown-sluzby')}
                      onMouseEnter={() => setHoveredLink('dropdown-sluzby')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Komplexní finanční plán
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={`${baseUrl}/kontrola-smluv`} 
                      style={getMobileLinkStyle('dropdown-kontrola')}
                      onMouseEnter={() => setHoveredLink('dropdown-kontrola')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Kontrola smluv
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link 
                href={`${baseUrl}/nas-tym`} 
                style={getDesktopLinkStyle('tym')}
                onMouseEnter={() => setHoveredLink('tym')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Náš tým
              </Link>
            </li>

            <li>
              <Link 
                href={`${baseUrl}/reference`} 
                style={getDesktopLinkStyle('reference')}
                onMouseEnter={() => setHoveredLink('reference')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Reference
              </Link>
            </li>
            <li>
              <Link 
                href={`${baseUrl}/kariera`} 
                style={getDesktopLinkStyle('kariera')}
                onMouseEnter={() => setHoveredLink('kariera')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Kariéra
              </Link>
            </li>

            <li style={{ position: 'relative' }}>
              <div 
                onClick={() => toggleDropdown('novinky')} 
                style={getDropdownTriggerStyle('novinky-dropdown')}
                onMouseEnter={() => setHoveredLink('novinky-dropdown')}
                onMouseLeave={() => setHoveredLink(null)}
              >
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
                    <Link 
                      href={`${baseUrl}/blog`} 
                      style={getMobileLinkStyle('dropdown-blog')}
                      onMouseEnter={() => setHoveredLink('dropdown-blog')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={`${baseUrl}/podcast`} 
                      style={getMobileLinkStyle('dropdown-podcast')}
                      onMouseEnter={() => setHoveredLink('dropdown-podcast')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Podcast
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link 
                href={`${baseUrl}/kontakt`} 
                style={getDesktopLinkStyle('kontakt')}
                onMouseEnter={() => setHoveredLink('kontakt')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
} 