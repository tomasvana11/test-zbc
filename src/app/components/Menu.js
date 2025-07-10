'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="p-2 text-orange-800"
        aria-label="Otevřít menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#f8f1ec] text-orange-800 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-black">
              za boha<span className="text-orange-700 font-extrabold">+</span>ší česko
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 bg-orange-700 text-white px-3 py-2 rounded hover:bg-orange-800"
            >
              <XIcon className="w-4 h-4" />
              Zavřít
            </button>
          </div>

          <nav className="space-y-4 text-lg font-medium">
            <MenuLink label="Domů" href="/" />
            <Dropdown
              label="Služby"
              isOpen={openDropdown === 'sluzby'}
              onClick={() => toggleDropdown('sluzby')}
            >
              <SubLink label="Poradenství" href="/sluzby/poradenstvi" />
              <SubLink label="Strategie" href="/sluzby/strategie" />
            </Dropdown>
            <MenuLink label="Náš tým" href="/nas-tym" />
            <MenuLink label="Reference" href="/reference" />
            <MenuLink label="Kariéra" href="/kariera" />
            <Dropdown
              label="Novinky a vzdělávání"
              isOpen={openDropdown === 'novinky'}
              onClick={() => toggleDropdown('novinky')}
            >
              <SubLink label="Blog" href="/novinky/blog" />
              <SubLink label="Workshopy" href="/novinky/workshopy" />
            </Dropdown>
            <MenuLink label="Kontakt" href="/kontakt" />
          </nav>
        </div>
      )}
    </>
  );
}

function MenuLink({ label, href }) {
  return (
    <div className="border-t border-gray-300 pt-3">
      <a href={href} className="block hover:text-black">
        {label}
      </a>
    </div>
  );
}

function Dropdown({ label, isOpen, onClick, children }) {
  return (
    <div className="border-t border-gray-300 pt-3">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full hover:text-black"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 ml-4 space-y-2 text-base text-orange-700">{children}</div>
      )}
    </div>
  );
}

function SubLink({ label, href }) {
  return (
    <a href={href} className="block hover:underline">
      {label}
    </a>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 01-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 01-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
