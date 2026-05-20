"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const UIDrawersContext = createContext(null);

const CART_STORAGE_KEY = "oem_cart";

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

function normalizeQuantity(desiredQuantity) {
  return Math.max(1, coerceNumber(desiredQuantity, 1));
}

function hasStorageProductId(item) {
  return item?.storageProductId != null || item?.storage_product_id != null;
}

function buildLegacyKey({ productId, brand = "", code = "", warehouse = "" }) {
  if (productId == null) return null;
  return `${String(productId)}::${String(brand)}::${String(code)}::${String(warehouse)}`;
}

function isLegacyMatch(existing, legacyKey, { productId, brand, code, warehouse }) {
  if (!existing) return false;
  if (existing?.key === legacyKey) return true;
  if (hasStorageProductId(existing)) return false;

  const sameProduct = String(existing?.productId ?? "") === String(productId ?? "");
  const sameBrand = String(existing?.brand ?? "").trim() === String(brand ?? "").trim();
  const sameCode = String(existing?.code ?? "").trim() === String(code ?? "").trim();
  const sameWarehouse = String(existing?.warehouse ?? "").trim() === String(warehouse ?? "").trim();
  return sameProduct && sameBrand && sameCode && sameWarehouse;
}

function mergeWithAddedQuantity(existing, incoming, key, addedQuantity) {
  const desired = normalizeQuantity(coerceNumber(existing?.quantity, 1) + addedQuantity);
  return {
    ...existing,
    ...incoming,
    key,
    quantity: desired,
  };
}

function readCartFromStorage() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartToStorage(cartItems) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {}
}

export function CartProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    setCartItems(readCartFromStorage());
    setIsCartReady(true);
  }, []);

  useEffect(() => {
    writeCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((item) => {
    if (!item) return;
    const key = item.key ?? item.id ?? null;
    if (!key) return;

    const quantity = normalizeQuantity(item.quantity);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((x) => x?.key === key);
      if (existingIndex !== -1) {
        const next = [...prev];
        next[existingIndex] = mergeWithAddedQuantity(prev[existingIndex], item, key, quantity);
        return next;
      }

      if (hasStorageProductId(item)) {
        const productId = item?.productId;
        const brand = item?.brand ?? "";
        const code = item?.code ?? "";
        const warehouse = item?.warehouse ?? "";
        const legacyKey = buildLegacyKey({ productId, brand, code, warehouse });

        if (legacyKey) {
          const legacyIndex = prev.findIndex((x) => isLegacyMatch(x, legacyKey, { productId, brand, code, warehouse }));
          if (legacyIndex !== -1) {
            const next = [...prev];
            next[legacyIndex] = mergeWithAddedQuantity(prev[legacyIndex], item, key, quantity);
            return next;
          }
        }
      }

      return [...prev, { ...item, key, quantity }];
    });
  }, []);

  const setCartItemQuantity = useCallback((key, quantity) => {
    if (!key) return;
    setCartItems((prev) =>
      prev.map((x) => {
        if (x?.key !== key) return x;
        return { ...x, quantity: normalizeQuantity(quantity) };
      })
    );
  }, []);

  const removeCartItem = useCallback((key) => {
    if (!key) return;
    setCartItems((prev) => prev.filter((x) => x?.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);

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
      isCartReady,
      cartCount,
      cartSubtotalNumber,
      cartSubtotalText,
      addToCart,
      setCartItemQuantity,
      removeCartItem,
      clearCart,
      openMobileMenu,
      closeMobileMenu,
      openCart,
      closeCart,
      openWishlist,
      closeWishlist,
    }),
    [
      isMobileMenuOpen,
      isCartOpen,
      isWishlistOpen,
      cartItems,
      isCartReady,
      cartCount,
      cartSubtotalNumber,
      cartSubtotalText,
      addToCart,
      setCartItemQuantity,
      removeCartItem,
      clearCart,
      openMobileMenu,
      closeMobileMenu,
      openCart,
      closeCart,
      openWishlist,
      closeWishlist,
    ]
  );

  return (
    <UIDrawersContext.Provider value={value}>
      {children}
    </UIDrawersContext.Provider>
  );
}

export const UIDrawersProvider = CartProvider;

export function useUIDrawers() {
  const ctx = useContext(UIDrawersContext);
  if (!ctx) throw new Error("useUIDrawers must be used within CartProvider");
  return ctx;
}

export function useCart() {
  return useUIDrawers();
}
