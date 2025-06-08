'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Menu() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
    setOpenDropdown(null)
  }

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const menuItems = [
    { label: 'O nás', href: '/about' },
    {
      label: 'Služby',
      id: 'services',
      children: [
        { label: 'Finanční plánování', href: '/sluzby/planovani' },
        { label: 'Investice', href: '/sluzby/investice' },
      ],
    },
    {
      label: 'Poradci',
      id: 'advisors',
      children: [
        { label: 'Václav Svatoš', href: '/poradci/vaclav' },
        { label: 'Sabina Vytisková', href: '/poradci/sabina' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/kontakt' },
  ]

  return (
    <nav className="absolute top-0 left-0 w-full z-[200]">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-transparent">
        {/* Logo vlevo */}
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={160} height={32} />
        </Link>

        {/* Mobilní toggle */}
        <button onClick={toggleMobile} className="md:hidden flex items-center gap-2">
          <Image
            src={mobileOpen ? '/images/close.svg' : '/images/menu.svg'}
            alt="toggle"
            width={24}
            height={24}
          />
          <span className="text-silkBeige text-lg">
            {mobileOpen ? 'Zavřít' : 'Menu'}
          </span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 items-center text-silkBeige text-lg relative">
  {menuItems.map((item) =>
    item.children ? (
      <li key={item.id} className="relative group cursor-pointer">
        <div className="flex items-center gap-1">
          <span>{item.label}</span>
          {/* Chevron ONLY for desktop – no rotation */}
          <Image
            src="/images/chevron-down.svg"
            alt="dropdown"
            width={12}
            height={12}
            className="ml-1"
          />
        </div>
        {/* Dropdown – stays open on hover */}
        <ul className="absolute left-0 top-full bg-white text-raisinBlack shadow-md rounded mt-2 min-w-[180px] z-50 hidden group-hover:block group-focus-within:block">
          {item.children.map((child) => (
            <li key={child.href} className="hover:bg-gray-100 px-4 py-2 whitespace-nowrap">
              <Link href={child.href}>{child.label}</Link>
            </li>
          ))}
        </ul>
      </li>
    ) : (
      <li key={item.href}>
        <Link href={item.href}>{item.label}</Link>
      </li>
    )
  )}
</ul>

      </div>

      {/* Mobilní menu (po otevření) */}
      {mobileOpen && (
        <div className="md:hidden bg-silkBeige text-raisinBlack min-h-screen w-full p-6 z-[200] relative">
          <div className="absolute top-6 right-6">
            <Image src="/images/logo-alt.svg" alt="logo mobile" width={100} height={28} />
          </div>

          <ul className="flex flex-col gap-6 mt-10">
            {menuItems.map((item) =>
              item.children ? (
                <li key={item.id}>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    {item.label}
                    <Image
                      src="/images/chevron-down.svg"
                      alt="dropdown"
                      width={16}
                      height={16}
                      className={`transition-transform ${
                        openDropdown === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === item.id && (
                    <ul className="pl-4 mt-2 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
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
        </div>
      )}
    </nav>
  )
}
