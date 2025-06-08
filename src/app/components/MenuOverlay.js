'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMenu } from './MenuContext';

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

export default function MenuOverlay() {
  const { isMenuOpen, setIsMenuOpen, openDropdown, setOpenDropdown } = useMenu();

  if (!isMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-silkBeige text-raisinBlack flex flex-col items-center justify-center px-8 py-20"
      onClick={() => setIsMenuOpen(false)}
    >
      <div
        className="max-w-[320px] w-full bg-white rounded p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <img src="/images/logo-white.svg" alt="Logo" width={150} height={40} />
          <button
            aria-label="Zavřít menu"
            onClick={() => setIsMenuOpen(false)}
            className="focus:outline-none"
          >
            <Image src="/images/close.svg" alt="Close" width={24} height={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {menuItems.map((item) =>
            item.children ? (
              <li key={item.id} className="w-full">
                <button
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === item.id ? null : item.id))
                  }
                  className="w-full flex justify-between items-center font-semibold text-lg"
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
                </button>
                {openDropdown === item.id && (
                  <ul className="mt-2 ml-4 border-l border-gray-300 pl-4 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setIsMenuOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <hr className="my-3" />
              </li>
            ) : (
              <li key={item.href} className="w-full">
                <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="block font-semibold text-lg">
                  {item.label}
                </Link>
                <hr className="my-3" />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
