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

function normalizeQuantity(desiredQuantity) {
  return Math.max(1, coerceNumber(desiredQuantity, 1));
}

export function UIDrawersProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("oem_cart");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setCartItems(parsed);
    } catch {
    } finally {
      setIsCartReady(true);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("oem_cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  function addToCart(item) {
    if (!item) return;
    const key = item.key ?? item.id ?? null;
    if (!key) return;

    const quantity = normalizeQuantity(item.quantity);

    setCartItems((prev) => {
      const hasStorageProductId = item?.storageProductId != null || item?.storage_product_id != null;
      const productId = item?.productId;
      const brand = item?.brand ?? "";
      const code = item?.code ?? "";
      const warehouse = item?.warehouse ?? "";
      const legacyKey =
        hasStorageProductId && productId != null ? `${String(productId)}::${String(brand)}::${String(code)}::${String(warehouse)}` : null;

      const existingIndex = prev.findIndex((x) => x?.key === key);
      if (existingIndex === -1) {
        const legacyIndex = legacyKey
          ? prev.findIndex((x) => {
              if (x?.key === legacyKey) return true;
              const xHasSp = x?.storageProductId != null || x?.storage_product_id != null;
              if (xHasSp) return false;
              const sameProduct = String(x?.productId ?? "") === String(productId ?? "");
              const sameBrand = String(x?.brand ?? "").trim() === String(brand ?? "").trim();
              const sameCode = String(x?.code ?? "").trim() === String(code ?? "").trim();
              const sameWarehouse = String(x?.warehouse ?? "").trim() === String(warehouse ?? "").trim();
              return sameProduct && sameBrand && sameCode && sameWarehouse;
            })
          : -1;
        if (legacyIndex !== -1) {
          const legacy = prev[legacyIndex];
          const next = [...prev];
          const desired = normalizeQuantity(coerceNumber(legacy?.quantity, 1) + quantity);
          next[legacyIndex] = {
            ...legacy,
            ...item,
            key,
            quantity: desired,
          };
          return next;
        }
        return [...prev, { ...item, key, quantity }];
      }

      const existing = prev[existingIndex];
      const next = [...prev];
      const desired = normalizeQuantity(coerceNumber(existing?.quantity, 1) + quantity);
      next[existingIndex] = {
        ...existing,
        ...item,
        key,
        quantity: desired,
      };
      return next;
    });
  }

  function setCartItemQuantity(key, quantity) {
    if (!key) return;
    setCartItems((prev) =>
      prev.map((x) => {
        if (x?.key !== key) return x;
        return { ...x, quantity: normalizeQuantity(quantity) };
      })
    );
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
      isCartReady,
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
    [isMobileMenuOpen, isCartOpen, isWishlistOpen, cartItems, isCartReady, cartCount, cartSubtotalNumber, cartSubtotalText]
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
