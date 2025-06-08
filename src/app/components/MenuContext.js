'use client';

import { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, openDropdown, setOpenDropdown }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
