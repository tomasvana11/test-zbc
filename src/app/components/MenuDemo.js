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

  return (
    <div
      className={`fixed z-50 transition-all ${
        scrolled ? 'top-4 sm:top-4' : 'top-4 sm:top-0'
      } left-0 right-0 sm:left-4 sm:right-4`}
      style={{ marginTop: scrolled ? '16px' : '16px' }} // margin top 16px i při ne-scrollu (nahrazuje top-8)
    >
      <div
        ref={menuRef}
        className={`flex justify-between items-center transition-all backdrop-blur-xl ${
          scrolled ? 'bg-zinc-900/75' : 'bg-transparent'
        } 
        p-4 sm:p-6 
        w-full sm:max-w-screen-xl 
        mx-0 sm:mx-auto 
        rounded-none sm:rounded-xl
        `}
        style={{
          padding: '16px',
          borderRadius: '0',
          marginLeft: '0',
          marginRight: '0',
          marginTop: '0',
        }}
      >
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <a>
              <img src="/images/menu-zbc-logo-l.svg" alt="Logo" className="h-8" />
            </a>
          </Link>
        </div>

        {/* Navigace */}
        <ul className="flex gap-11 items-center text-[#E2DBD5] font-normal list-none m-0 p-0">
          <li>
            <Link href="/">Domů</Link>
          </li>

          {/* Dropdown: Služby */}
          <li className="relative cursor-pointer">
            <div onClick={() => toggleDropdown('sluzby')} className="flex items-center">
              Služby
              <img src="/images/menu-chevron-down.svg" alt="šipka" className="ml-2 h-6" />
            </div>
            {openDropdown === 'sluzby' && (
              <ul className="absolute top-full left-0 bg-[#E2DBD5]/80 text-[#232323] shadow-lg py-2 rounded min-w-[160px] z-50">
                <li>
                  <Link href="/sluzby/sluzba-1">
                    <a className="block px-5 py-2">Služba 1</a>
                  </Link>
                </li>
                <li>
                  <Link href="/sluzby/sluzba-2">
                    <a className="block px-5 py-2">Služba 2</a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/reference">Reference</Link>
          </li>

          {/* Dropdown: Novinky */}
          <li className="relative cursor-pointer">
            <div onClick={() => toggleDropdown('novinky')} className="flex items-center">
              Novinky a vzdělávání
              <img src="/images/menu-chevron-down.svg" alt="šipka" className="ml-2 h-6" />
            </div>
            {openDropdown === 'novinky' && (
              <ul className="absolute top-full left-0 bg-[#E2DBD5]/80 text-[#232323] shadow-lg py-2 rounded min-w-[220px] z-50">
                <li>
                  <Link href="/novinky/novinka-1">
                    <a className="block px-5 py-2">Novinka 1</a>
                  </Link>
                </li>
                <li>
                  <Link href="/vzdelavani/vzdelavani-1">
                    <a className="block px-5 py-2">Vzdělávání 1</a>
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
