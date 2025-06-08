'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-[1392px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo (switches when mobile menu open) */}
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
                  <Image
                    src="/images/chevron-down.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                </div>
                {/* Dropdown */}
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

        {/* Mobile Toggle */}
        <div
          className="md:hidden flex items-center gap-2 cursor-pointer z-50"
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-silkBeige text-raisinBlack flex flex-col items-center justify-center px-8 py-20">
          <ul className="flex flex-col gap-6 items-center text-xl w-full max-w-[320px]">
            {menuItems.map((item) =>
              item.children ? (
                <li key={item.id} className="w-full">
                  <div
                    className="flex items-center justify-between w-full cursor-pointer"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === item.id ? null : item.id
                      )
                    }
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
                    <ul className="mt-2 ml-2 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className="w-full text-center">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
