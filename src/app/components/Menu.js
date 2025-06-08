'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  {
    id: 'o-nas',
    label: 'O nás',
    children: [
      { label: 'Náš tým', href: '/tym' },
      { label: 'Historie', href: '/historie' },
    ],
  },
  {
    id: 'sluzby',
    label: 'Služby',
    children: [
      { label: 'Konzultace', href: '/konzultace' },
      { label: 'Realizace', href: '/realizace' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
  },
];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pro desktop dropdown delay, aby dropdown nezmizel hned při pomalém přejíždění
  const handleMouseEnter = (id) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 300); // 300ms delay na zavření dropdownu
  };

  // Toggle dropdown na mobilu (po kliknutí)
  const toggleDropdownMobile = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Zavřít mobilní menu a dropdowny při kliknutí na odkaz
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-[1392px] mx-auto px-4 py-4 flex items-center justify-between bg-transparent">
        {/* Logo (mění se podle stavu menu) */}
        <Link href="/">
          <Image
            src={isMenuOpen && isMobile ? '/images/logo-white.svg' : '/images/logo.svg'}
            alt="Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="flex items-center gap-10 text-silkBeige text-lg relative">
            {menuItems.map((item) =>
              item.children ? (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-2 cursor-pointer select-none">
                    <span>{item.label}</span>
                    <Image
                      src="/images/chevron-down.svg"
                      alt=""
                      width={12}
                      height={12}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {openDropdown === item.id && (
                    <ul className="absolute top-full left-0 mt-2 bg-white text-raisinBlack shadow-lg rounded px-4 py-2 z-50 min-w-[160px]">
                      {item.children.map((child) => (
                        <li key={child.href} className="py-1 hover:underline">
                          <Link href={child.href}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              )
            )}
          </ul>
        )}

        {/* Mobile Toggle */}
        {isMobile && (
          <div
            className="flex items-center gap-2 cursor-pointer z-[300]"
            onClick={() => {
              setIsMenuOpen((prev) => {
                if (prev) setOpenDropdown(null); // Zavřít dropdowny při zavření menu
                return !prev;
              });
            }}
          >
            <Image
              src={isMenuOpen ? '/images/close.svg' : '/images/menu.svg'}
              alt={isMenuOpen ? 'Zavřít' : 'Menu'}
              width={24}
              height={24}
            />
            <span className="text-silkBeige font-medium uppercase text-lg">
              {isMenuOpen ? 'Zavřít' : 'Menu'}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 z-[200] bg-silkBeige text-raisinBlack flex flex-col pt-20 px-8 overflow-auto">
          <ul className="flex flex-col w-full max-w-[320px] mx-auto">
            {menuItems.map((item, idx) => (
              <li key={item.id ?? item.href} className="w-full">
                {item.children ? (
                  <>
                    <div
                      className="flex items-center justify-between w-full cursor-pointer select-none py-4"
                      onClick={() => toggleDropdownMobile(item.id)}
                    >
                      <span>{item.label}</span>
                      <Image
                        src="/images/chevron-down.svg"
                        alt="dropdown"
                        width={16}
                        height={16}
                        className={`transition-transform duration-300 ${
                          openDropdown === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {openDropdown === item.id && (
                      <ul className="ml-4 flex flex-col gap-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={handleMobileLinkClick}
                              className="block py-2"
                            >
                              {child.label}
                            </Link>
                            <hr className="border-raisinBlack opacity-30" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className="block py-4 text-center w-full"
                    >
                      {item.label}
                    </Link>
                    {/* Divider kromě posledního */}
                    {idx !== menuItems.length - 1 && (
                      <hr className="border-raisinBlack opacity-30" />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
