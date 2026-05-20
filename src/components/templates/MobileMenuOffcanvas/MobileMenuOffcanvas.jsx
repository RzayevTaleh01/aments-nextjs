"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import OffcanvasPanel from "@/components/templates/OffcanvasPanel/OffcanvasPanel";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/cart-context";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/utils/cn";
import { navigation } from "@/constants/navigation";
import styles from "./MobileMenuOffcanvas.module.scss";

const TOP_LINKS = navigation.topLinks ?? [];
const MAIN_NAV_ITEMS = navigation.main ?? [];

const LANG_LABELS = { en: "English", az: "Azərbaycan", ru: "Русский" };
const LANG_OPTIONS = [
  { id: "en", label: "English", value: "en", iconSrc: "/assets/images/icon/lang-en.png" },
  { id: "az", label: "Azərbaycan", value: "az" },
  { id: "ru", label: "Русский", value: "ru" },
];

function isAdminRole(user) {
  const role = user?.role ?? user?.roleId ?? user?.role_id ?? user?.user_role;
  if (role === 1 || role === "1") return true;
  if (role && typeof role === "object") {
    return role?.id === 1 || role?.value === 1 || role?.key === 1;
  }
  return false;
}

export default function MobileMenuOffcanvas({
  isOpen,
  onClose,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const { cartCount } = useCart();
  const { staticContent } = useInitial();
  const { lang, setLang } = useLanguage();
  const qFromUrl = useMemo(() => String(searchParams?.get("q") ?? "").trim(), [searchParams]);

  const langLabel = useMemo(() => {
    return LANG_LABELS[String(lang || "").toLowerCase()] ?? LANG_LABELS.en;
  }, [lang]);

  useEffect(() => {
    setSearchQuery(qFromUrl);
  }, [qFromUrl]);

  const filteredTopLinks = useMemo(() => {
    return TOP_LINKS.filter((x) => {
      if (!x) return false;
      if (isAuthenticated) return x?.id !== "login" && x?.id !== "register";
      return x?.id !== "my-account";
    });
  }, [isAuthenticated]);

  const topLinksWithAdminPanel = useMemo(() => {
    const canSeeAdminPanel = isAuthenticated && isAdminRole(session?.user);
    if (!canSeeAdminPanel) return filteredTopLinks;

    const adminItem = { id: "admin-panel", label: "Admin Panel", href: "/admin" };
    if (filteredTopLinks.some((x) => x?.id === adminItem.id || x?.href === adminItem.href)) return filteredTopLinks;

    const myAccountIndex = filteredTopLinks.findIndex((x) => x?.id === "my-account");
    if (myAccountIndex === -1) return [...filteredTopLinks, adminItem];

    return [
      ...filteredTopLinks.slice(0, myAccountIndex + 1),
      adminItem,
      ...filteredTopLinks.slice(myAccountIndex + 1),
    ];
  }, [filteredTopLinks, isAuthenticated, session?.user]);

  const handleLangSelect = (value) => {
    setLang(value);
    onClose?.();
    const until = Date.now() + 900;
    try {
      window.localStorage?.setItem("oem_lang_loader_until", String(until));
    } catch {}
    window.dispatchEvent(new CustomEvent("oem:lang-loader", { detail: { until } }));
    window.setTimeout(() => window.location.reload(), 50);
  };

  const toggleSubmenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <OffcanvasPanel
      id="mobile-menu-offcanvas"
      className={cn(styles, "offcanvas offcanvas-leftside offcanvas-mobile-menu-section")}
      isOpen={isOpen}
      openClassName={cn(styles, "offcanvas-open")}
      headerClassName={cn(styles, "offcanvas-header d-flex justify-content-end")}
      closeButtonClassName={cn(styles, "offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cn(styles, "offcanvas-mobile-menu-wrapper")}>
        <div className={cn(styles, "mobile-menu-top")}>
          <span>
            {HelperTranslate({
              defaultText: "Welcome to our store!",
              translateText: staticContent?.header__topWelcomeText,
            })}
          </span>
          <ul className={cn(styles, "mobile-menu-user-menu")}>
            {topLinksWithAdminPanel.map((item) => {
              const itemKey = item.id ?? item.href ?? item.label;
              const href = item?.href && item.href !== "#" ? item.href : "/";
              const translateKey = `header__topLink__${String(item?.id ?? "").trim()}`;

              if (item?.id !== "language") {
                return (
                  <li key={itemKey}>
                    <Link href={href} onClick={onClose}>
                      {HelperTranslate({ defaultText: item.label, translateText: staticContent?.[translateKey] })}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={itemKey} className={cn(styles, "has-mobile-user-dropdown")}>
                  <button type="button" className={cn(styles, "mobile-user-menu-link")}>
                    {langLabel} <Icon name="FaAngleDown" size={14} />
                  </button>
                  <ul className={cn(styles, "mobile-user-sub-menu")}>
                    {LANG_OPTIONS.map((opt) => (
                      <li key={opt.id}>
                        <button type="button" onClick={() => handleLangSelect(opt.value)}>
                          {opt.iconSrc ? (
                            <Image
                              className={cn(styles, "user-sub-menu-link-icon")}
                              src={opt.iconSrc}
                              alt=""
                              width={16}
                              height={11}
                            />
                          ) : null}
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
            {isAuthenticated ? (
              <li>
                <button
                  type="button"
                  className={cn(styles, "mobile-user-menu-link")}
                  onClick={async () => {
                    await signOut({ redirect: false });
                    onClose?.();
                    router.push("/");
                  }}
                >
                  {HelperTranslate({ defaultText: "Logout", translateText: staticContent?.header__logout })}
                </button>
              </li>
            ) : null}
          </ul>
        </div>
        <div className={cn(styles, "mobile-menu-center")}>
          <form
            action="#"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              const q = String(searchQuery || "").trim();
              router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
              onClose?.();
            }}
          >
            <div className={cn(styles, "header-search-box default-search-style d-flex")}>
              <input
                className={cn(styles, "default-search-style-input-box border-around border-right-none")}
                type="search"
                placeholder={HelperTranslate({
                  defaultText: "OEM kod yazın...",
                  translateText: staticContent?.mobile__searchPlaceholder,
                })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={cn(styles, "default-search-style-input-btn")} type="submit">
                <Icon name="FaSearch" size={16} />
              </button>
            </div>
          </form>
          <div className={cn(styles, "mobile-menu-customer-support")}>
            <div className={cn(styles, "mobile-menu-customer-support-icon")}>
              <Image src="/assets/images/icon/support-icon.png" alt="" width={48} height={48} />
            </div>
            <div className={cn(styles, "mobile-menu-customer-support-text")}>
              <span>{HelperTranslate({ defaultText: "Customer Support", translateText: staticContent?.footer__customerSupport })}</span>
              <a className={cn(styles, "mobile-menu-customer-support-text-phone")} href="tel:(08)123456789">
                (08) 123 456 789
              </a>
            </div>
          </div>
          <ul className={cn(styles, "mobile-action-icon")}>
            <li className={cn(styles, "mobile-action-icon-item")}>
              <Link href="/cart" className={cn(styles, "mobile-action-icon-link")} onClick={onClose}>
                <Icon name="FaShoppingCart" />
                <span className={cn(styles, "mobile-action-icon-item-count")}>{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={cn(styles, "mobile-menu-bottom")}>
          <div className={cn(styles, "offcanvas-menu")}>
            <ul>
              {MAIN_NAV_ITEMS.map((item) => {
                const hasChildren = Array.isArray(item?.children) && item.children.length > 0;
                const itemId = item?.id ?? item?.href ?? item?.label;
                const navKey = `nav__main__${String(item?.id ?? "").trim()}`;
                const href = item?.href && item.href !== "#" ? item.href : "/";
                const isOpenItem = openMenuId === itemId;

                if (!hasChildren) {
                  return (
                    <li key={itemId}>
                      <Link href={href} onClick={onClose}>
                        {HelperTranslate({ defaultText: item.label, translateText: staticContent?.[navKey] })}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={itemId} className={isOpenItem ? cn(styles, "active") : undefined}>
                    <button type="button" onClick={() => toggleSubmenu(itemId)}>
                      {HelperTranslate({ defaultText: item.label, translateText: staticContent?.[navKey] })}
                    </button>
                    <button
                      type="button"
                      className={cn(styles, "offcanvas-menu-expand")}
                      onClick={() => toggleSubmenu(itemId)}
                      aria-label="Toggle submenu"
                    >
                      <Icon name={isOpenItem ? "FaMinus" : "FaPlus"} size={12} />
                    </button>
                    <ul className={cn(styles, "mobile-sub-menu")}>
                      {item.children.map((child) => {
                        const childKey = child?.id ?? child?.href ?? child?.label;
                        const childHref = child?.href && child.href !== "#" ? child.href : "/";
                        return (
                          <li key={childKey}>
                            <Link href={childHref} onClick={onClose}>
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
          <a className={cn(styles, "mobile-menu-email icon-text-end")} href="mailto:info@yourdomain.com">
            <Icon name="FaEnvelope" size={14} /> info@yourdomain.com
          </a>
          <ul className={cn(styles, "mobile-menu-social")}>
            <li>
              <Link href="/" className={cn(styles, "facebook")} onClick={onClose}>
                <Icon name="FaFacebookF" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cn(styles, "twitter")} onClick={onClose}>
                <Icon name="FaTwitter" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cn(styles, "youtube")} onClick={onClose}>
                <Icon name="FaYoutube" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cn(styles, "pinterest")} onClick={onClose}>
                <Icon name="FaPinterestP" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cn(styles, "instagram")} onClick={onClose}>
                <Icon name="FaInstagram" size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </OffcanvasPanel>
  );
}
