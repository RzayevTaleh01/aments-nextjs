"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { navigation } from "@/constants/navigation";
import { cn } from "@/utils/cn";
import styles from "./Header.module.scss";

export default function DesktopHeader({ pathname, isSticky, onOpen }) {
  return (
    <header className="header-section d-lg-block d-none">
      {/* ... (Header Top Area remains the same) */}
      <div className={cn(styles["header-top"], "header-top")}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="header-top--left">
                <span>Welcome to our store!</span>
              </div>
            </div>
            <div className="col-6">
              <div className="header-top--right">
                <ul className={cn(styles["header-user-menu"], "header-user-menu")}>
                  <li className="user-dropdown">
                    <Link href="#" className="d-inline-flex align-items-center">
                      Setting <Icon name="FaAngleDown" size={12} className="ms-1" />
                    </Link>
                    <ul className="user-sub-menu">
                      {navigation.topLinks.settings.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="user-dropdown">
                    <Link href="#" className="d-inline-flex align-items-center">
                      $ USD <Icon name="FaAngleDown" size={12} className="ms-1" />
                    </Link>
                    <ul className="user-sub-menu">
                      {navigation.topLinks.currencies.map((curr) => (
                        <li key={curr}>
                          <Link href="#">{curr}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="user-dropdown">
                    <Link href="#" className="d-inline-flex align-items-center">
                      English <Icon name="FaAngleDown" size={12} className="ms-1" />
                    </Link>
                    <ul className="user-sub-menu">
                      {navigation.topLinks.languages.map((lang) => (
                        <li key={lang.label}>
                          <Link href="#">
                            <Image
                              className="user-sub-menu-in-icon"
                              src={lang.iconSrc}
                              alt={lang.label}
                              width={16}
                              height={11}
                            />{" "}
                            {lang.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link href="/compare">
                      <Icon name="FaRetweet" size={14} /> Compare (0)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Header Center Area */}
      <div className={cn(styles["header-center"], "header-center")}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-3">
              <div className="header-logo">
                <Link href="/">
                  <Image src="/assets/images/logo/logo.png" alt="Aments" width={140} height={40} />
                </Link>
              </div>
            </div>
            <div className="col-6">
                      <div className="header-search">
                        <form action="#" method="post">
                          <div className="header-search-box default-search-style d-flex">
                            <input
                              className="default-search-style-input-box border-around border-right-none"
                              type="search"
                              placeholder="Search entire store here ..."
                              required
                            />
                            <button className="default-search-style-input-btn" type="submit">
                              <Icon name="FaSearch" size={18} />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-3 text-end">
                      <ul className={cn(styles["header-action-icon"], "header-action-icon")}>
                        <li>
                          <button type="button" onClick={() => onOpen("wishlist")}>
                            <Icon name="FaHeart" size={18} />
                            <span className={cn(styles["header-action-icon-item-count"], "header-action-icon-item-count")}>0</span>
                          </button>
                        </li>
                        <li>
                          <button type="button" onClick={() => onOpen("mini-cart")}>
                            <Icon name="FaShoppingCart" size={18} />
                            <span className={cn(styles["header-action-icon-item-count"], "header-action-icon-item-count")}>0</span>
                          </button>
                        </li>
                      </ul>
                    </div>
          </div>
        </div>
      </div>

      {/* Start Bottom Area */}
      <div className={cn(styles["header-bottom"], "header-bottom", isSticky && cn(styles["sticky-header"], "sticky-header"))}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={cn(styles["main-menu"], "main-menu")}>
                <nav>
                  <ul>
                    {navigation.main.map((item) => (
                      <li
                        key={item.label}
                        className={cn(item.children && cn(styles["has-dropdown"], "has-dropdown"), item.mega && cn(styles["has-megaitem"], "has-megaitem"))}
                      >
                        <Link
                          href={item.href}
                          className={cn("main-menu-link", pathname === item.href && "active")}
                        >
                          {item.label} {item.children && <Icon name="FaChevronDown" size={14} className="ms-1" />}
                        </Link>
                        
                        {item.children && !item.mega && (
                          <ul className="sub-menu">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href}>{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.mega && (
                          <div className="mega-menu">
                            <ul className="mega-menu-inner">
                              <li className="mega-menu-item">
                                <Link href="#" className="mega-menu-item-title">
                                  Shop Layouts
                                </Link>
                                <ul className="mega-menu-sub">
                                  {navigation.megaMenu.shopLayouts.map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href}>{l.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                              <li className="mega-menu-item">
                                <Link href="#" className="mega-menu-item-title">
                                  Other Pages
                                </Link>
                                <ul className="mega-menu-sub">
                                  {navigation.megaMenu.otherPages.map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href}>{l.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                              <li className="mega-menu-item">
                                <Link href="#" className="mega-menu-item-title">
                                  Product Types
                                </Link>
                                <ul className="mega-menu-sub">
                                  {navigation.megaMenu.productTypes.slice(0, 5).map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href}>{l.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                              <li className="mega-menu-item">
                                <Link href="#" className="mega-menu-item-title">
                                  Product Types
                                </Link>
                                <ul className="mega-menu-sub">
                                  {navigation.megaMenu.productTypes.slice(5).map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href}>{l.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            </ul>
                            <div className="menu-banner">
                              <Link href={navigation.megaMenu.banner.href} className="menu-banner-link">
                                <img
                                  className="menu-banner-img"
                                  src={navigation.megaMenu.banner.imageSrc}
                                  alt={navigation.megaMenu.banner.alt}
                                />
                              </Link>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
