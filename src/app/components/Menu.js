'use client';

import { useState } from 'react';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full fixed flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Menu Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700 focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      {/* Navigation */}
      <nav className={`absolute right-4 top-16 bg-white border rounded-lg shadow-md p-4 space-y-2 w-48 z-50 ${menuOpen ? 'block' : 'hidden'} md:block md:static md:bg-transparent md:p-0 md:shadow-none md:w-auto md:flex md:items-center md:space-x-6 md:space-y-0`}>
        {/* Link 1 */}
        <a href="/link1" className="block text-gray-800 hover:text-blue-600">
          Link 1
        </a>

        {/* Link 2 */}
        <a href="/link2" className="block text-gray-800 hover:text-blue-600">
          Link 2
        </a>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="block w-full text-left text-gray-800 hover:text-blue-600 focus:outline-none"
          >
            Dropdown ▼
          </button>

          {dropdownOpen && (
            <div className="mt-2 bg-white border rounded shadow-md absolute right-0 w-40 z-50">
              <a href="/dropdown/item1" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                Item 1
              </a>
              <a href="/dropdown/item2" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                Item 2
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
