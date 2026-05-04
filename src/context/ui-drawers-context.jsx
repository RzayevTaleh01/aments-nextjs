"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UIDrawersContext = createContext(null);

function coerceNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parsePriceNumber(priceText) {
  if (typeof priceText === "number" && Number.isFinite(priceText)) return priceText;
  if (typeof priceText !== "string") return null;
  const normalized = priceText.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatMoney(value, currency) {
  const n = typeof value === "number" ? value : parsePriceNumber(value);
  if (!Number.isFinite(n)) return currency ? `0.00 ${currency}` : "0.00";
  const text = n.toFixed(2);
  return currency ? `${text} ${currency}` : text;
}

export function UIDrawersProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("aments:cart");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setCartItems(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("aments:cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  function addToCart(item) {
    if (!item) return;
    const key = item.key ?? item.id ?? null;
    if (!key) return;

    const quantity = Math.max(1, coerceNumber(item.quantity, 1));

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((x) => x?.key === key);
      if (existingIndex === -1) return [...prev, { ...item, key, quantity }];

      const existing = prev[existingIndex];
      const next = [...prev];
      next[existingIndex] = { ...existing, ...item, key, quantity: Math.max(1, coerceNumber(existing?.quantity, 1) + quantity) };
      return next;
    });
  }

  function setCartItemQuantity(key, quantity) {
    if (!key) return;
    const qty = Math.max(1, coerceNumber(quantity, 1));
    setCartItems((prev) => prev.map((x) => (x?.key === key ? { ...x, quantity: qty } : x)));
  }

  function removeCartItem(key) {
    if (!key) return;
    setCartItems((prev) => prev.filter((x) => x?.key !== key));
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(() => cartItems.reduce((sum, x) => sum + Math.max(0, coerceNumber(x?.quantity, 0)), 0), [cartItems]);

  const cartSubtotalNumber = useMemo(() => {
    return cartItems.reduce((sum, x) => {
      const unit = parsePriceNumber(x?.unitPrice);
      const qty = Math.max(0, coerceNumber(x?.quantity, 0));
      if (!Number.isFinite(unit)) return sum;
      return sum + unit * qty;
    }, 0);
  }, [cartItems]);

  const cartCurrency = useMemo(() => {
    const first = cartItems.find((x) => x?.currency);
    return first?.currency ?? "";
  }, [cartItems]);

  const cartSubtotalText = useMemo(() => formatMoney(cartSubtotalNumber, cartCurrency), [cartSubtotalNumber, cartCurrency]);

  const value = useMemo(
    () => ({
      isMobileMenuOpen,
      isCartOpen,
      isWishlistOpen,
      cartItems,
      cartCount,
      cartSubtotalNumber,
      cartSubtotalText,
      addToCart,
      setCartItemQuantity,
      removeCartItem,
      clearCart,
      openMobileMenu: () => setIsMobileMenuOpen(true),
      closeMobileMenu: () => setIsMobileMenuOpen(false),
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      openWishlist: () => setIsWishlistOpen(true),
      closeWishlist: () => setIsWishlistOpen(false),
    }),
    [isMobileMenuOpen, isCartOpen, isWishlistOpen, cartItems, cartCount, cartSubtotalNumber, cartSubtotalText]
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

export function useCart() {
  return useUIDrawers();
}

