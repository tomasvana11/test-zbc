'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="p-2 text-orange-800"
        aria-label="Otevřít menu"
      >
        ☰
      </button>

      {/* Fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white text-orange-800 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-black">
              za boha<span className="text-orange-700 font-extrabold">+</span>ší česko
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 bg-orange-700 text-white px-3 py-2 rounded hover:bg-orange-800"
            >
              <X className="w-4 h-4" />
              Zavřít
            </button>
          </div>

          {/* Links */}
          <nav className="space-y-4 text-lg font-medium">
            <MenuLink label="Domů" href="/" />
            <Dropdown label="Služby" isOpen={openDropdown === 'sluzby'} onClick={() => toggleDropdown('sluzby')}>
              <SubLink label="Poradenství" href="/sluzby/poradenstvi" />
              <SubLink label="Strategie" href="/sluzby/strategie" />
            </Dropdown>
            <MenuLink label="Náš tým" href="/nas-tym" />
            <MenuLink label="Reference" href="/reference" />
            <Dropdown label="Novinky a vzdělávání" isOpen={openDropdown === 'novinky'} onClick={() => toggleDropdown('novinky')}>
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
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
