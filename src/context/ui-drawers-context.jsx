"use client";

import { createContext, useContext, useMemo, useState } from "react";

const UIDrawersContext = createContext(null);

export function UIDrawersProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const value = useMemo(
    () => ({
      isMobileMenuOpen,
      isCartOpen,
      isWishlistOpen,
      openMobileMenu: () => setIsMobileMenuOpen(true),
      closeMobileMenu: () => setIsMobileMenuOpen(false),
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      openWishlist: () => setIsWishlistOpen(true),
      closeWishlist: () => setIsWishlistOpen(false),
    }),
    [isMobileMenuOpen, isCartOpen, isWishlistOpen]
  );

  return (
    <UIDrawersContext.Provider value={value}>
      {children}
    </UIDrawersContext.Provider>
  );
}

export function useUIDrawers() {
  const ctx = useContext(UIDrawersContext);
  if (!ctx) throw new Error("useUIDrawers must be used within UIDrawersProvider");
  return ctx;
}

