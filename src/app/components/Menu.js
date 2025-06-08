'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({}); // { key: true/false }

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const links = [
    { label: 'Domů', href: '/' },
    {
      label: 'Služby',
      href: '#',
      dropdown: [
        { label: 'Konzultace', href: '/services/consultation' },
        { label: 'Plánování', href: '/services/planning' },
      ],
    },
    {
      label: 'Blog',
      href: '#',
      dropdown: [
        { label: 'Novinky', href: '/blog/news' },
        { label: 'Tipy', href: '/blog/tips' },
      ],
    },
    { label: 'Kontakt', href: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {links.map((link, i) =>
            link.dropdown ? (
              <li key={i} className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center space-x-1 font-semibold text-gray-800 hover:text-goldenBrown"
                >
                  <span>{link.label}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown */}
                <ul className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-10">
                  {link.dropdown.map((dd, idx) => (
                    <li key={idx}>
                      <Link
                        href={dd.href}
                        className="block px-4 py-2 hover:bg-goldenBrown hover:text-white"
                      >
                        {dd.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={i}>
                <Link
                  href={link.href}
                  className="font-semibold text-gray-800 hover:text-goldenBrown"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {/* Tvoje vlastní SVG ikona */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Tady vlož svůj SVG path */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-800">Menu</span>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col px-4 py-4 space-y-2">
            {links.map((link, i) =>
              link.dropdown ? (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(i)}
                    className="w-full flex justify-between items-center font-semibold text-gray-800"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        dropdownOpen[i] ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen[i] && (
                    <ul className="pl-4 mt-2 flex flex-col space-y-1 border-l border-gray-300">
                      {link.dropdown.map((dd, idx) => (
                        <li key={idx}>
                          <Link
                            href={dd.href}
                            className="block px-2 py-1 text-gray-700 hover:text-goldenBrown"
                            onClick={() => setMobileMenuOpen(false)} // zavřít menu po kliknutí na odkaz
                          >
                            {dd.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="font-semibold text-gray-800 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
