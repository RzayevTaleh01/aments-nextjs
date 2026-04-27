"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createCx } from "@/utils/createCx";
import styles from "./Header.module.scss";
import HeaderCartOffcanvas from "./HeaderCartOffcanvas";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobileBar from "./HeaderMobileBar";
import HeaderMobileMenuOffcanvas from "./HeaderMobileMenuOffcanvas";
import HeaderWishlistOffcanvas from "./HeaderWishlistOffcanvas";

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [openOffcanvasId, setOpenOffcanvasId] = useState(null);
  const mobileMenuRef = useRef(null);
  const cx = createCx(styles);

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
    const body = document.body;
    if (!body) return;

    const prevOverflow = body.style.overflow;
    if (openOffcanvasId) body.style.overflow = "hidden";
    else body.style.overflow = prevOverflow || "";

    return () => {
      body.style.overflow = prevOverflow || "";
    };
  }, [openOffcanvasId]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      closeOffcanvas();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOffcanvas]);

  useEffect(() => {
    const root = mobileMenuRef.current;
    if (!root) return;

    const mobileSubMenuClass = styles["mobile-sub-menu"];
    const activeClass = styles.active;
    const expanderClass = styles["offcanvas-menu-expand"];
    const cleanups = [];

    const getDirectMobileSubMenus = (li) =>
      Array.from(li.children).filter(
        (el) => el?.tagName === "UL" && el.classList?.contains(mobileSubMenuClass)
      );

    const collapse = (ul) => {
      ul.style.display = "none";
      ul.style.height = "";
      ul.style.overflow = "";
    };

    const expand = (ul) => {
      ul.style.display = "block";
      ul.style.height = "";
      ul.style.overflow = "";
    };

    const toggleLi = (li) => {
      const subMenus = getDirectMobileSubMenus(li);
      if (subMenus.length === 0) return;

      const parentUl = li.parentElement;
      if (parentUl) {
        Array.from(parentUl.children).forEach((sibling) => {
          if (sibling === li) return;
          if (!(sibling instanceof HTMLElement)) return;
          if (!sibling.classList.contains(activeClass)) return;
          sibling.classList.remove(activeClass);
          getDirectMobileSubMenus(sibling).forEach(collapse);
        });
      }

      if (li.classList.contains(activeClass)) {
        li.classList.remove(activeClass);
        subMenus.forEach(collapse);
      } else {
        li.classList.add(activeClass);
        subMenus.forEach(expand);
      }
    };

    Array.from(root.querySelectorAll("li")).forEach((li) => {
      const subMenus = getDirectMobileSubMenus(li);
      if (subMenus.length === 0) return;

      subMenus.forEach(collapse);

      const alreadyHasExpander = li.querySelector(`:scope > .${expanderClass}`);
      if (!alreadyHasExpander) {
        const expander = document.createElement("div");
        expander.className = expanderClass;
        li.insertBefore(expander, li.firstChild);

        const onExpandClick = (e) => {
          e.preventDefault();
          toggleLi(li);
        };
        expander.addEventListener("click", onExpandClick);
        cleanups.push(() => expander.removeEventListener("click", onExpandClick));
      }

      const link = li.querySelector(":scope > a");
      if (link) {
        const href = link.getAttribute("href") || "";
        const isPlaceholder = href === "#" || href.endsWith("#");
        if (isPlaceholder) {
          const onLinkClick = (e) => {
            e.preventDefault();
            toggleLi(li);
          };
          link.addEventListener("click", onLinkClick);
          cleanups.push(() => link.removeEventListener("click", onLinkClick));
        }
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const isActive = useCallback(
    (href) => {
      if (!pathname) return false;
      if (href === "/" && pathname === "/") return true;
      if (href !== "/" && pathname.startsWith(href)) return true;
      return false;
    },
    [pathname]
  );

  return (
    <>
      <HeaderDesktop
        cx={cx}
        isSticky={isSticky}
        isActive={isActive}
        onOffcanvasToggle={handleOffcanvasToggle}
      />
      <HeaderMobileBar cx={cx} onOffcanvasToggle={handleOffcanvasToggle} />
      <HeaderMobileMenuOffcanvas
        cx={cx}
        isOpen={openOffcanvasId === "mobile-menu-offcanvas"}
        onClose={closeOffcanvas}
        mobileMenuRef={mobileMenuRef}
      />
      <HeaderCartOffcanvas cx={cx} isOpen={openOffcanvasId === "offcanvas-add-cart"} onClose={closeOffcanvas} />
      <HeaderWishlistOffcanvas
        cx={cx}
        isOpen={openOffcanvasId === "offcanvas-wishlish"}
        onClose={closeOffcanvas}
      />

      <div
        className={cx("offcanvas-overlay")}
        style={{ display: openOffcanvasId ? "block" : "none" }}
        onClick={closeOffcanvas}
      />
    </>
  );
}

