"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import styles from "./Header.module.scss";
import CartOffcanvas from "../CartOffcanvas";
import HeaderGroup from "./HeaderGroup";
import HeaderMobileBar from "./HeaderMobileBar";
import MobileMenuOffcanvas from "../MobileMenuOffcanvas";
import WishlistOffcanvas from "../WishlistOffcanvas";

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [openOffcanvasId, setOpenOffcanvasId] = useState(null);

  const closeOffcanvas = useCallback(() => {
    setOpenOffcanvasId(null);
  }, []);

  const openOffcanvas = useCallback((id) => {
    setOpenOffcanvasId(id);
  }, []);

  const handleOffcanvasToggle = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href) return;
      if (!href.startsWith("#")) return;
      e.preventDefault();
      openOffcanvas(href.slice(1));
    },
    [openOffcanvas]
  );

  useEffect(() => {
    closeOffcanvas();
  }, [closeOffcanvas, pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY >= 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      closeOffcanvas();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOffcanvas]);


  const isActive = useCallback(
    (href) => {
      if (!pathname) return false;
      if (href === "/" && pathname === "/") return true;
      if (href !== "/" && pathname.startsWith(href)) return true;
      return false;
    },
    [pathname]
  );

  // Bottom header data array
  const BottomHeaderData = [
    {
      id: "home",
      type: "dropdown",
      label: "Home",
      href: "/",
      activeMatch: "/",
      items: [{ id: "home-1", label: "Home 1", href: "/" }],
    },
    {
      id: "shop",
      type: "mega",
      label: "Shop",
      href: "/product/default",
      activeMatch: ["/shop", "/product"],
      mega: {
        columns: [
          {
            id: "shop-layouts",
            title: "Shop Layouts",
            items: [
              { id: "grid-left", label: "Grid Left Sidebar", href: "/shop/grid/sidebar-left" },
              { id: "grid-right", label: "Grid Right Sidebar", href: "/shop/grid/sidebar-right" },
              { id: "full-width", label: "Full Width", href: "/shop/full-width" },
              { id: "list-left", label: "List Left Sidebar", href: "/shop/list/sidebar-left" },
              { id: "list-right", label: "List Right Sidebar", href: "/shop/list/sidebar-right" },
            ],
          },
          {
            id: "other-pages",
            title: "Other Pages",
            items: [
              { id: "cart", label: "Cart", href: "/cart" },
              { id: "wishlist", label: "Wishlist", href: "/wishlist" },
              { id: "compare", label: "Compare", href: "/compare" },
              { id: "checkout", label: "Checkout", href: "/checkout" },
              { id: "login", label: "Login", href: "/login" },
              { id: "my-account", label: "My Account", href: "/my-account" },
            ],
          },
          {
            id: "product-types-1",
            title: "Product Types",
            items: [
              { id: "product-default", label: "Product Default", href: "/product/default" },
              { id: "product-variable", label: "Product Variable", href: "/product/variable" },
              { id: "product-affiliate", label: "Product Referral", href: "/product/affiliate" },
              { id: "product-group", label: "Product Group", href: "/product/group" },
              { id: "product-single-slide", label: "Product Slider", href: "/product/single-slide" },
            ],
          },
          {
            id: "product-types-2",
            title: "Product Types",
            items: [
              { id: "product-tab-left", label: "Product Tab Left", href: "/product/tab-left" },
              { id: "product-tab-right", label: "Product Tab Right", href: "/product/tab-right" },
              { id: "product-gallery-left", label: "Product Gallery Left", href: "/product/gallery-left" },
              { id: "product-gallery-right", label: "Product Gallery Right", href: "/product/gallery-right" },
              { id: "product-sticky-left", label: "Product Sticky Left", href: "/product/sticky-left" },
              { id: "product-sticky-right", label: "Product Sticky right", href: "/product/sticky-right" },
            ],
          },
        ],
        banner: {
          href: "/",
          image: {
            src: "/assets/images/banner/menu-banner.jpg",
            width: 320,
            height: 320,
            alt: "",
          },
        },
      },
    },
    {
      id: "pages",
      type: "dropdown",
      label: "Pages",
      activeMatch: ["/service", "/faq", "/privacy-policy", "/404"],
      items: [
        { id: "service", label: "Service", href: "/service" },
        { id: "faq", label: "Frequently Questions", href: "/faq" },
        { id: "privacy-policy", label: "Privacy Policy", href: "/privacy-policy" },
        { id: "error-404", label: "404 Page", href: "/404" },
      ],
    },
    { id: "about-us", type: "link", label: "About Us", href: "/about-us", activeMatch: "/about-us" },
    { id: "contact-us", type: "link", label: "Contact Us", href: "/contact-us", activeMatch: "/contact-us" },
  ];

  return (
    <>
      <HeaderGroup
        isSticky={isSticky}
        isActive={isActive}
        onOffcanvasToggle={handleOffcanvasToggle}
        BottomHeaderData={BottomHeaderData}
      />
      <HeaderMobileBar onOffcanvasToggle={handleOffcanvasToggle} />
      <MobileMenuOffcanvas
        isOpen={openOffcanvasId === "mobile-menu-offcanvas"}
        onClose={closeOffcanvas}
      />
      
      <CartOffcanvas isOpen={openOffcanvasId === "offcanvas-add-cart"} onClose={closeOffcanvas} />
      
      <WishlistOffcanvas
        isOpen={openOffcanvasId === "offcanvas-wishlish"}
        onClose={closeOffcanvas}
      />

      <div
        className={cn(styles, "offcanvas-overlay")}
        style={{ display: openOffcanvasId ? "block" : "none" }}
        onClick={closeOffcanvas}
      />
    </>
  );
}

