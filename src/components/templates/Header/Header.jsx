"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import styles from "./Header.module.scss";
import { navigation } from "@/constants/navigation";
import CartOffcanvas from "../CartOffcanvas";
import HeaderGroup from "./HeaderGroup";
import HeaderMobileBar from "./HeaderMobileBar";
import MobileMenuOffcanvas from "../MobileMenuOffcanvas";

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

  const makeId = (value) =>
    String(value ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const makeLinkId = (href, label) => makeId(href || label);

  const megaProductTypes = navigation.megaMenu?.productTypes ?? [];
  const megaProductTypesCol1 = megaProductTypes.slice(0, 5);
  const megaProductTypesCol2 = megaProductTypes.slice(5);

  const BottomHeaderData = (navigation.main ?? []).map((item) => {
    if (item.mega) {
      return {
        id: item.id ?? makeId(item.label),
        type: "mega",
        label: item.label,
        href: item.href,
        activeMatch: item.activeMatch ?? item.href,
        mega: {
          columns: [
            {
              id: "shop-layouts",
              title: "Shop Layouts",
              items: (navigation.megaMenu?.shopLayouts ?? []).map((link) => ({
                id: makeLinkId(link.href, link.label),
                label: link.label,
                href: link.href,
              })),
            },
            {
              id: "other-pages",
              title: "Other Pages",
              items: (navigation.megaMenu?.otherPages ?? []).map((link) => ({
                id: makeLinkId(link.href, link.label),
                label: link.label,
                href: link.href,
              })),
            },
            {
              id: "product-types-1",
              title: "Product Types",
              items: megaProductTypesCol1.map((link) => ({
                id: makeLinkId(link.href, link.label),
                label: link.label,
                href: link.href,
              })),
            },
            {
              id: "product-types-2",
              title: "Product Types",
              items: megaProductTypesCol2.map((link) => ({
                id: makeLinkId(link.href, link.label),
                label: link.label,
                href: link.href,
              })),
            },
          ],
          banner: navigation.megaMenu?.banner
            ? {
                href: navigation.megaMenu.banner.href,
                image: {
                  src: navigation.megaMenu.banner.imageSrc,
                  width: 320,
                  height: 320,
                  alt: navigation.megaMenu.banner.alt ?? "",
                },
              }
            : null,
        },
      };
    }

    if (item.children?.length) {
      return {
        id: item.id ?? makeId(item.label),
        type: "dropdown",
        label: item.label,
        href: item.href === "#" ? null : item.href,
        activeMatch: item.activeMatch ?? item.href,
        items: item.children.map((link) => ({
          id: makeLinkId(link.href, link.label),
          label: link.label,
          href: link.href,
        })),
      };
    }

    return {
      id: item.id ?? makeId(item.label),
      type: "link",
      label: item.label,
      href: item.href,
      activeMatch: item.activeMatch ?? item.href,
    };
  });

  const topHeaderData = {
    welcomeText: navigation.topWelcomeText,
    links: navigation.topLinks ?? [],
  };

  return (
    <>
      <HeaderGroup
        isSticky={isSticky}
        isActive={isActive}
        onOffcanvasToggle={handleOffcanvasToggle}
        BottomHeaderData={BottomHeaderData}
        topHeaderData={topHeaderData}
      />
      <HeaderMobileBar onOffcanvasToggle={handleOffcanvasToggle} />
      <MobileMenuOffcanvas
        isOpen={openOffcanvasId === "mobile-menu-offcanvas"}
        onClose={closeOffcanvas}
      />
      
      <CartOffcanvas isOpen={openOffcanvasId === "offcanvas-add-cart"} onClose={closeOffcanvas} />

      <div
        className={cn(styles, "offcanvas-overlay")}
        style={{ display: openOffcanvasId ? "block" : "none" }}
        onClick={closeOffcanvas}
      />
    </>
  );
}

