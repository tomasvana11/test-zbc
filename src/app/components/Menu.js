'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMenu } from './MenuContext';
import { useEffect, useState } from 'react';

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
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Menu() {
  const { isMenuOpen, setIsMenuOpen, openDropdown, setOpenDropdown } = useMenu();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="relative w-full z-10 max-w-[1392px] mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/">
        <Image
          src={isMenuOpen && isMobile ? '/images/logo-white.svg' : '/images/logo.svg'}
          alt="Logo"
          width={150}
          height={40}
          priority
        />
      </Link>

      {/* Desktop menu */}
      <ul className="hidden md:flex items-center gap-10 text-silkBeige text-lg">
        {menuItems.map((item) =>
          item.children ? (
            <li
              key={item.id}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <span>{item.label}</span>
                <Image src="/images/chevron-down.svg" alt="" width={12} height={12} />
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

      {/* Mobile toggle */}
      <div
        className="md:hidden flex items-center gap-2 cursor-pointer z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
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
    </nav>
  );
}
