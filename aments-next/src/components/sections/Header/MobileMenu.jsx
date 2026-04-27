"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { navigation } from "@/constants/navigation";
import styles from "./Header.module.scss";

export default function MobileMenu({ onNavigate }) {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState(() => new Set());

  const tree = useMemo(
    () => [
      {
        key: "home",
        label: "Home",
        href: "#",
        children: [
          { key: "home-1", label: "Home 1", href: "/" },
          { key: "home-2", label: "Home 2", href: "/home-2" },
        ],
      },
      {
        key: "shop",
        label: "Shop",
        href: "#",
        children: [
          {
            key: "shop-layouts",
            label: "Shop Layout",
            href: "#",
            children: navigation.megaMenu.shopLayouts.map((l) => ({ key: l.href, label: l.label, href: l.href })),
          },
          {
            key: "shop-pages",
            label: "Shop Pages",
            href: "#",
            children: [
              ...navigation.megaMenu.otherPages.map((l) => ({ key: l.href, label: l.label, href: l.href })),
              { key: "/404", label: "Error 404", href: "/404" },
            ],
          },
          {
            key: "product-single",
            label: "Product Single",
            href: "#",
            children: navigation.megaMenu.productTypes.map((l) => ({ key: l.href, label: l.label, href: l.href })),
          },
        ],
      },
      {
        key: "blogs",
        label: "Blogs",
        href: "#",
        children: [
          {
            key: "blog-grid",
            label: "Blog Grid",
            href: "#",
            children: [
              { key: "/blog/grid/sidebar-left", label: "Blog Grid Sidebar left", href: "/blog/grid/sidebar-left" },
              { key: "/blog/grid/sidebar-right", label: "Blog Grid Sidebar Right", href: "/blog/grid/sidebar-right" },
            ],
          },
          { key: "/blog/full-width", label: "Blog Full Width", href: "/blog/full-width" },
          {
            key: "blog-single",
            label: "Blog Single",
            href: "#",
            children: [
              { key: "/blog/post/sidebar-left", label: "Blog Single Sidebar left", href: "/blog/post/sidebar-left" },
              { key: "/blog/post/sidebar-right", label: "Blog Single Sidebar Right", href: "/blog/post/sidebar-right" },
            ],
          },
        ],
      },
      {
        key: "pages",
        label: "Pages",
        href: "#",
        children: [
          { key: "/about-us", label: "About Us", href: "/about-us" },
          { key: "/service", label: "Service", href: "/service" },
          { key: "/faq", label: "Frequently Questions", href: "/faq" },
          { key: "/privacy-policy", label: "Privacy Policy", href: "/privacy-policy" },
          { key: "/404p", label: "404 Page", href: "/404" },
        ],
      },
      { key: "/contact-us", label: "Contact Us", href: "/contact-us" },
    ],
    []
  );

  function toggle(key) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function Item({ item }) {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"));
    const isExpanded = openKeys.has(item.key);

    return (
      <li className={cn((isExpanded || isActive) && styles.active)}>
        <Link
          href={item.href}
          onClick={(e) => {
            if (item.href === "#") e.preventDefault();
            if (item.href !== "#") onNavigate();
          }}
        >
          <span>{item.label}</span>
        </Link>
        {hasChildren ? (
          <>
            <div
              className={cn(styles["offcanvas-menu-expand"], "offcanvas-menu-expand")}
              role="button"
              tabIndex={0}
              onClick={() => toggle(item.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggle(item.key);
              }}
            />
            <ul className={cn(styles["mobile-sub-menu"], "mobile-sub-menu")} style={{ display: isExpanded ? "block" : "none" }}>
              {item.children.map((child) => (
                <Item key={child.key} item={child} />
              ))}
            </ul>
          </>
        ) : null}
      </li>
    );
  }

  return (
    <div className={cn(styles["offcanvas-menu"], "offcanvas-menu")}>
      <ul>
        {tree.map((item) => (
          <Item key={item.key} item={item} />
        ))}
      </ul>
    </div>
  );
}

