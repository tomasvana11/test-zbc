'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-[1392px] mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          <img src="/images/logo.svg" alt="Logo" className="h-8" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link href="/o-nas" className="hover:underline">
            O nás
          </Link>
          <div className="relative group">
            <button className="hover:underline">Služby</button>
            <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded p-2 text-black">
              <Link href="/sluzby/poradenstvi" className="block px-4 py-2 hover:bg-gray-100">
                Poradenství
              </Link>
              <Link href="/sluzby/planovani" className="block px-4 py-2 hover:bg-gray-100">
                Plánování
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:underline">Blog</button>
            <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded p-2 text-black">
              <Link href="/blog/aktuality" className="block px-4 py-2 hover:bg-gray-100">
                Aktuality
              </Link>
              <Link href="/blog/poradenstvi" className="block px-4 py-2 hover:bg-gray-100">
                Poradenství
              </Link>
            </div>
          </div>
          <Link href="/kontakt" className="hover:underline">
            Kontakt
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src="/images/menu-icon.svg" alt="menu" className="h-6 w-6 invert" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 text-black">
          <div className="flex flex-col px-4 py-2 gap-2">
            <Link href="/o-nas" className="py-2 border-b" onClick={toggleMenu}>
              O nás
            </Link>
            <details>
              <summary className="py-2 border-b cursor-pointer">Služby</summary>
              <div className="pl-4">
                <Link href="/sluzby/poradenstvi" className="block py-1" onClick={toggleMenu}>
                  Poradenství
                </Link>
                <Link href="/sluzby/planovani" className="block py-1" onClick={toggleMenu}>
                  Plánování
                </Link>
              </div>
            </details>
            <details>
              <summary className="py-2 border-b cursor-pointer">Blog</summary>
              <div className="pl-4">
                <Link href="/blog/aktuality" className="block py-1" onClick={toggleMenu}>
                  Aktuality
                </Link>
                <Link href="/blog/poradenstvi" className="block py-1" onClick={toggleMenu}>
                  Poradenství
                </Link>
              </div>
            </details>
            <Link href="/kontakt" className="py-2 border-b" onClick={toggleMenu}>
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
