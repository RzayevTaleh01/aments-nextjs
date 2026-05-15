"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import OffcanvasPanel from "@/components/templates/OffcanvasPanel/OffcanvasPanel";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/utils/cn";
import styles from "./MobileMenuOffcanvas.module.scss";

export default function MobileMenuOffcanvas({
  isOpen,
  onClose,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const { cartCount } = useCart();
  const { staticContent } = useInitial();
  const { lang, setLang } = useLanguage();
  const qFromUrl = useMemo(() => String(searchParams?.get("q") ?? "").trim(), [searchParams]);

  const langLabel = useMemo(() => {
    const map = { en: "English", az: "Azərbaycan", ru: "Русский" };
    return map[String(lang || "").toLowerCase()] ?? map.en;
  }, [lang]);

  const langOptions = useMemo(
    () => [
      { id: "en", label: "English", value: "en", iconSrc: "/assets/images/icon/lang-en.png" },
      { id: "az", label: "Azərbaycan", value: "az", iconSrc: "/assets/images/icon/lang-gr.png" },
      { id: "ru", label: "Русский", value: "ru", iconSrc: "/assets/images/icon/lang-gr.png" },
    ],
    []
  );

  useEffect(() => {
    setSearchQuery(qFromUrl);
  }, [qFromUrl]);

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
            <li className={cn(styles, "has-mobile-user-dropdown")}>
              <Link className={cn(styles, "mobile-user-menu-link")} href="/" onClick={onClose}>
                {HelperTranslate({ defaultText: "Setting", translateText: staticContent?.mobile__settings })}{" "}
                <Icon name="FaAngleDown" size={14} />
              </Link>
              <ul className={cn(styles, "mobile-user-sub-menu")}>
                <li>
                  <Link href="/checkout" onClick={onClose}>
                    {HelperTranslate({ defaultText: "Checkout", translateText: staticContent?.addToCartModal__checkout })}
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <Link href="/my-account" onClick={onClose}>
                      {HelperTranslate({ defaultText: "My Account", translateText: staticContent?.["header__topLink__my-account"] })}
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Link href="/cart" onClick={onClose}>
                    {HelperTranslate({ defaultText: "Shopping Cart", translateText: staticContent?.mobile__shoppingCart })}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={cn(styles, "has-mobile-user-dropdown")}>
              <Link className={cn(styles, "mobile-user-menu-link")} href="/" onClick={onClose}>
                $ USD <Icon name="FaAngleDown" size={14} />
              </Link>
              <ul className={cn(styles, "mobile-user-sub-menu")}>
                <li>
                  <Link href="/" onClick={onClose}>
                    EUR – Euro
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={onClose}>
                    GBP – British Pound
                  </Link>
                </li>
                <li>
                  <Link href="/cart" onClick={onClose}>
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={onClose}>
                    INR – India Rupee
                  </Link>
                </li>
              </ul>
            </li>
            <li className={cn(styles, "has-mobile-user-dropdown")}>
              <Link className={cn(styles, "mobile-user-menu-link")} href="/" onClick={onClose}>
                {langLabel} <Icon name="FaAngleDown" size={14} />
              </Link>
              <ul className={cn(styles, "mobile-user-sub-menu")}>
                {langOptions.map((opt) => (
                  <li key={opt.id}>
                    <Link
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setLang(opt.value);
                        onClose?.();
                        const until = Date.now() + 900;
                        try {
                          window.localStorage?.setItem("oem_lang_loader_until", String(until));
                        } catch {}
                        window.dispatchEvent(new CustomEvent("oem:lang-loader", { detail: { until } }));
                        window.setTimeout(() => window.location.reload(), 50);
                      }}
                    >
                      {opt.iconSrc ? (
                        <Image
                          className={cn(styles, "user-sub-menu-link-icon")}
                          src={opt.iconSrc}
                          alt=""
                          width={16}
                          height={11}
                        />
                      ) : null}{" "}
                      {opt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
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
              <li>
                <Link href="/" onClick={onClose}>
                  {HelperTranslate({ defaultText: "Home", translateText: staticContent?.nav__main__home })}
                </Link>
              </li>
              <li>
                <Link href="/products" onClick={onClose}>
                  {HelperTranslate({ defaultText: "Products", translateText: staticContent?.nav__main__products })}
                </Link>
              </li>
              <li>
                <Link href="/about-us" onClick={onClose}>
                  {HelperTranslate({ defaultText: "About Us", translateText: staticContent?.["nav__main__about-us"] })}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" onClick={onClose}>
                  {HelperTranslate({ defaultText: "Contact Us", translateText: staticContent?.["nav__main__contact-us"] })}
                </Link>
              </li>
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
