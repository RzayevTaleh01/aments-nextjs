"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [openOffcanvasId, setOpenOffcanvasId] = useState(null);
  const mobileMenuRef = useRef(null);

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

    if (openOffcanvasId) body.classList.add("offcanvas-open");
    else body.classList.remove("offcanvas-open");

    const prevOverflow = body.style.overflow;
    if (openOffcanvasId) body.style.overflow = "hidden";
    else body.style.overflow = prevOverflow || "";

    return () => {
      body.classList.remove("offcanvas-open");
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

    const cleanups = [];

    const getDirectMobileSubMenus = (li) =>
      Array.from(li.children).filter(
        (el) => el?.tagName === "UL" && el.classList?.contains("mobile-sub-menu")
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
          if (!sibling.classList.contains("active")) return;
          sibling.classList.remove("active");
          getDirectMobileSubMenus(sibling).forEach(collapse);
        });
      }

      if (li.classList.contains("active")) {
        li.classList.remove("active");
        subMenus.forEach(collapse);
      } else {
        li.classList.add("active");
        subMenus.forEach(expand);
      }
    };

    Array.from(root.querySelectorAll("li")).forEach((li) => {
      const subMenus = getDirectMobileSubMenus(li);
      if (subMenus.length === 0) return;

      subMenus.forEach(collapse);

      const alreadyHasExpander = li.querySelector(":scope > .offcanvas-menu-expand");
      if (!alreadyHasExpander) {
        const expander = document.createElement("div");
        expander.className = "offcanvas-menu-expand";
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
      <header className="header-section d-lg-block d-none">
        <div className="header-top">
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-6">
                <div className="header-top--left">
                  <span>Welcome to our store!</span>
                </div>
              </div>
              <div className="col-6">
                <div className="header-top--right">
                  <ul className="header-user-menu">
                    <li className="has-user-dropdown">
                      <Link href="/">Setting</Link>
                      <ul className="user-sub-menu">
                        <li>
                          <Link href="/checkout">Checkout</Link>
                        </li>
                        <li>
                          <Link href="/my-account">My Account</Link>
                        </li>
                        <li>
                          <Link href="/cart">Shopping Cart</Link>
                        </li>
                        <li>
                          <Link href="/wishlist">Wishlist</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-user-dropdown">
                      <Link href="/">$ USD</Link>
                      <ul className="user-sub-menu">
                        <li>
                          <Link href="/">EUR – Euro</Link>
                        </li>
                        <li>
                          <Link href="/">GBP – British Pound</Link>
                        </li>
                        <li>
                          <Link href="/">INR – India Rupee</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="has-user-dropdown">
                      <Link href="/">English</Link>
                      <ul className="user-sub-menu">
                        <li>
                          <Link href="/">
                            <Image
                              className="user-sub-menu-in-icon"
                              src="/assets/images/icon/lang-en.png"
                              alt=""
                              width={16}
                              height={11}
                            />{" "}
                            English
                          </Link>
                        </li>
                        <li>
                          <Link href="/">
                            <Image
                              className="user-sub-menu-in-icon"
                              src="/assets/images/icon/lang-gr.png"
                              alt=""
                              width={16}
                              height={11}
                            />{" "}
                            Germany
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/compare">
                        <i className="icon-repeat"></i> Compare (0)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-3">
                <div className="header-logo">
                  <Link href="/">
                    <Image src="/assets/images/logo/logo.png" alt="" width={140} height={40} />
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
                        <i className="icon-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-3 text-end">
                <ul className="header-action-icon">
                  <li>
                    <a
                      href="#offcanvas-wishlish"
                      className="offcanvas-toggle"
                      onClick={handleOffcanvasToggle}
                    >
                      <i className="icon-heart"></i>
                      <span className="header-action-icon-item-count">3</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#offcanvas-add-cart"
                      className="offcanvas-toggle"
                      onClick={handleOffcanvasToggle}
                    >
                      <i className="icon-shopping-cart"></i>
                      <span className="header-action-icon-item-count">3</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`header-bottom sticky-header${isSticky ? " sticky" : ""}`}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="main-menu">
                  <nav>
                    <ul>
                      <li className="has-dropdown">
                        <Link
                          className={`${isActive("/") ? "active " : ""}main-menu-link`}
                          href="/"
                        >
                          Home <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/">Home 1</Link>
                          </li>
                          <li>
                            <Link href="/home-2">Home 2</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="has-dropdown has-megaitem">
                        <Link href="/product/default">
                          Shop <i className="fa fa-angle-down"></i>
                        </Link>
                        <div className="mega-menu">
                          <ul className="mega-menu-inner">
                            <li className="mega-menu-item">
                              <a href="#" className="mega-menu-item-title" onClick={(e) => e.preventDefault()}>
                                Shop Layouts
                              </a>
                              <ul className="mega-menu-sub">
                                <li>
                                  <Link href="/shop/grid/sidebar-left">Grid Left Sidebar</Link>
                                </li>
                                <li>
                                  <Link href="/shop/grid/sidebar-right">Grid Right Sidebar</Link>
                                </li>
                                <li>
                                  <Link href="/shop/full-width">Full Width</Link>
                                </li>
                                <li>
                                  <Link href="/shop/list/sidebar-left">List Left Sidebar</Link>
                                </li>
                                <li>
                                  <Link href="/shop/list/sidebar-right">List Right Sidebar</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-item">
                              <a href="#" className="mega-menu-item-title" onClick={(e) => e.preventDefault()}>
                                Other Pages
                              </a>
                              <ul className="mega-menu-sub">
                                <li>
                                  <Link href="/cart">Cart</Link>
                                </li>
                                <li>
                                  <Link href="/wishlist">Wishlist</Link>
                                </li>
                                <li>
                                  <Link href="/compare">Compare</Link>
                                </li>
                                <li>
                                  <Link href="/checkout">Checkout</Link>
                                </li>
                                <li>
                                  <Link href="/login">Login</Link>
                                </li>
                                <li>
                                  <Link href="/my-account">My Account</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-item">
                              <a href="#" className="mega-menu-item-title" onClick={(e) => e.preventDefault()}>
                                Product Types
                              </a>
                              <ul className="mega-menu-sub">
                                <li>
                                  <Link href="/product/default">Product Default</Link>
                                </li>
                                <li>
                                  <Link href="/product/variable">Product Variable</Link>
                                </li>
                                <li>
                                  <Link href="/product/affiliate">Product Referral</Link>
                                </li>
                                <li>
                                  <Link href="/product/group">Product Group</Link>
                                </li>
                                <li>
                                  <Link href="/product/single-slide">Product Slider</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-item">
                              <a href="#" className="mega-menu-item-title" onClick={(e) => e.preventDefault()}>
                                Product Types
                              </a>
                              <ul className="mega-menu-sub">
                                <li>
                                  <Link href="/product/tab-left">Product Tab Left</Link>
                                </li>
                                <li>
                                  <Link href="/product/tab-right">Product Tab Right</Link>
                                </li>
                                <li>
                                  <Link href="/product/gallery-left">Product Gallery Left</Link>
                                </li>
                                <li>
                                  <Link href="/product/gallery-right">Product Gallery Right</Link>
                                </li>
                                <li>
                                  <Link href="/product/sticky-left">Product Sticky Left</Link>
                                </li>
                                <li>
                                  <Link href="/product/sticky-right">Product Sticky right</Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <div className="menu-banner">
                            <Link href="/" className="menu-banner-link">
                              <Image
                                className="menu-banner-img"
                                src="/assets/images/banner/menu-banner.jpg"
                                alt=""
                                width={320}
                                height={320}
                              />
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="has-dropdown">
                        <Link href="/blog/post/sidebar-left">
                          Blog <i className="fa fa-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/blog/grid/sidebar-left">Blog Grid Sidebar left</Link>
                          </li>
                          <li>
                            <Link href="/blog/grid/sidebar-right">Blog Grid Sidebar Right</Link>
                          </li>
                          <li>
                            <Link href="/blog/full-width">Blog Full Width</Link>
                          </li>
                          <li>
                            <Link href="/blog/post/sidebar-left">Blog Single Sidebar left</Link>
                          </li>
                          <li>
                            <Link href="/blog/post/sidebar-right">Blog Single Sidebar Right</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="has-dropdown">
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          Pages <i className="fa fa-angle-down"></i>
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/service">Service</Link>
                          </li>
                          <li>
                            <Link href="/faq">Frequently Questions</Link>
                          </li>
                          <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </li>
                          <li>
                            <Link href="/404">404 Page</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-header-section d-block d-lg-none">
        <div className="mobile-header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <div className="mobile-header--left">
                  <Link href="/" className="mobile-logo-link">
                    <Image
                      src="/assets/images/logo/logo.png"
                      alt=""
                      className="mobile-logo-img"
                      width={140}
                      height={40}
                    />
                  </Link>
                </div>
                <div className="mobile-header--right">
                  <a
                    href="#mobile-menu-offcanvas"
                    className="mobile-menu offcanvas-toggle"
                    onClick={handleOffcanvasToggle}
                  >
                    <span className="mobile-menu-dash"></span>
                    <span className="mobile-menu-dash"></span>
                    <span className="mobile-menu-dash"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu-offcanvas"
        className={`offcanvas offcanvas-leftside offcanvas-mobile-menu-section${
          openOffcanvasId === "mobile-menu-offcanvas" ? " offcanvas-open" : ""
        }`}
      >
        <div className="offcanvas-header d-flex justify-content-end">
          <button type="button" className="offcanvas-close" onClick={closeOffcanvas}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          <div className="mobile-menu-top">
            <span>Welcome to our store!</span>
            <ul className="mobile-menu-user-menu">
              <li>
                <Link className="header-user-menu-link" href="/compare">
                  <i className="icon-repeat"></i>Compare (0)
                </Link>
              </li>
              <li className="has-mobile-user-dropdown">
                <Link className="mobile-user-menu-link" href="/">
                  Setting
                </Link>
                <ul className="mobile-user-sub-menu">
                  <li>
                    <Link href="/checkout">Checkout</Link>
                  </li>
                  <li>
                    <Link href="/my-account">My Account</Link>
                  </li>
                  <li>
                    <Link href="/cart">Shopping Cart</Link>
                  </li>
                  <li>
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                </ul>
              </li>
              <li className=" has-mobile-user-dropdown">
                <Link className="mobile-user-menu-link" href="/">
                  $ USD
                </Link>
                <ul className="mobile-user-sub-menu">
                  <li>
                    <Link href="/">EUR – Euro</Link>
                  </li>
                  <li>
                    <Link href="/">GBP – British Pound</Link>
                  </li>
                  <li>
                    <Link href="/cart">Shopping Cart</Link>
                  </li>
                  <li>
                    <Link href="/">INR – India Rupee</Link>
                  </li>
                </ul>
              </li>
              <li className="has-mobile-user-dropdown">
                <Link className="mobile-user-menu-link" href="/">
                  English
                </Link>
                <ul className="mobile-user-sub-menu">
                  <li>
                    <Link href="/">
                      <Image
                        className="user-sub-menu-link-icon"
                        src="/assets/images/icon/lang-en.png"
                        alt=""
                        width={16}
                        height={11}
                      />{" "}
                      English
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image
                        className="user-sub-menu-link-icon"
                        src="/assets/images/icon/lang-gr.png"
                        alt=""
                        width={16}
                        height={11}
                      />{" "}
                      Germany
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mobile-menu-center">
            <form action="#" method="post">
              <div className="header-search-box default-search-style d-flex">
                <input
                  className="default-search-style-input-box border-around border-right-none"
                  type="search"
                  placeholder="Search entire store here ..."
                  required
                />
                <button className="default-search-style-input-btn" type="submit">
                  <i className="icon-search"></i>
                </button>
              </div>
            </form>
            <div className="mobile-menu-customer-support">
              <div className="mobile-menu-customer-support-icon">
                <Image src="/assets/images/icon/support-icon.png" alt="" width={48} height={48} />
              </div>
              <div className="mobile-menu-customer-support-text">
                <span>Customer Support</span>
                <a className="mobile-menu-customer-support-text-phone" href="tel:(08)123456789">
                  (08) 123 456 789
                </a>
              </div>
            </div>
            <ul className="mobile-action-icon">
              <li className="mobile-action-icon-item">
                <Link href="/wishlist" className="mobile-action-icon-link" onClick={closeOffcanvas}>
                  <i className="icon-heart"></i>
                  <span className="mobile-action-icon-item-count">3</span>
                </Link>
              </li>
              <li className="mobile-action-icon-item">
                <Link href="/cart" className="mobile-action-icon-link" onClick={closeOffcanvas}>
                  <i className="icon-shopping-cart"></i>
                  <span className="mobile-action-icon-item-count">3</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mobile-menu-bottom">
            <div className="offcanvas-menu" ref={mobileMenuRef}>
              <ul>
                <li>
                  <a href="#">
                    <span>Home</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <Link href="/" onClick={closeOffcanvas}>
                        Home 1
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-2" onClick={closeOffcanvas}>
                        Home 2
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>Shop</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="#">Shop Layout</a>
                      <ul className="mobile-sub-menu">
                        <li>
                          <Link href="/shop/grid/sidebar-left" onClick={closeOffcanvas}>
                            Grid Left Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop/grid/sidebar-right" onClick={closeOffcanvas}>
                            Grid Right Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop/full-width" onClick={closeOffcanvas}>
                            Full Width
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop/list/sidebar-left" onClick={closeOffcanvas}>
                            List Left Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop/list/sidebar-right" onClick={closeOffcanvas}>
                            List Right Sidebar
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="#">Shop Pages</a>
                      <ul className="mobile-sub-menu">
                        <li>
                          <Link href="/cart" onClick={closeOffcanvas}>
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link href="/wishlist" onClick={closeOffcanvas}>
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link href="/compare" onClick={closeOffcanvas}>
                            Compare
                          </Link>
                        </li>
                        <li>
                          <Link href="/checkout" onClick={closeOffcanvas}>
                            Checkout
                          </Link>
                        </li>
                        <li>
                          <Link href="/login" onClick={closeOffcanvas}>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link href="/my-account" onClick={closeOffcanvas}>
                            My Account
                          </Link>
                        </li>
                        <li>
                          <Link href="/404" onClick={closeOffcanvas}>
                            Error 404
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="#">Product Single</a>
                      <ul className="mobile-sub-menu">
                        <li>
                          <Link href="/product/default" onClick={closeOffcanvas}>
                            Product Default
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/variable" onClick={closeOffcanvas}>
                            Product Variable
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/affiliate" onClick={closeOffcanvas}>
                            Product Referral
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/group" onClick={closeOffcanvas}>
                            Product Group
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/single-slide" onClick={closeOffcanvas}>
                            Product Slider
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/tab-left" onClick={closeOffcanvas}>
                            Product Tab Left
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/tab-right" onClick={closeOffcanvas}>
                            Product Tab Right
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/gallery-left" onClick={closeOffcanvas}>
                            Product Gallery Left
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/gallery-right" onClick={closeOffcanvas}>
                            Product Gallery Right
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/sticky-left" onClick={closeOffcanvas}>
                            Product Sticky Left
                          </Link>
                        </li>
                        <li>
                          <Link href="/product/sticky-right" onClick={closeOffcanvas}>
                            Product Sticky right
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>Blogs</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="#">Blog Grid</a>
                      <ul className="mobile-sub-menu">
                        <li>
                          <Link href="/blog/grid/sidebar-left" onClick={closeOffcanvas}>
                            Blog Grid Sidebar left
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/grid/sidebar-right" onClick={closeOffcanvas}>
                            Blog Grid Sidebar Right
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/blog/full-width" onClick={closeOffcanvas}>
                        Blog Full Width
                      </Link>
                    </li>
                    <li>
                      <a href="#">Blog Single</a>
                      <ul className="mobile-sub-menu">
                        <li>
                          <Link href="/blog/post/sidebar-left" onClick={closeOffcanvas}>
                            Blog Single Sidebar left
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/post/sidebar-right" onClick={closeOffcanvas}>
                            Blog Single Sidebar Right
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>Pages</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <Link href="/about-us" onClick={closeOffcanvas}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/service" onClick={closeOffcanvas}>
                        Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" onClick={closeOffcanvas}>
                        Frequently Questions
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" onClick={closeOffcanvas}>
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/404" onClick={closeOffcanvas}>
                        404 Page
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact-us" onClick={closeOffcanvas}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <a className="mobile-menu-email icon-text-end" href="mailto:info@yourdomain.com">
              <i className="fa fa-envelope-o"> info@yourdomain.com</i>
            </a>
            <ul className="mobile-menu-social">
              <li>
                <Link href="/" className="facebook" onClick={closeOffcanvas}>
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="/" className="twitter" onClick={closeOffcanvas}>
                  <i className="fa fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="/" className="youtube" onClick={closeOffcanvas}>
                  <i className="fa fa-youtube"></i>
                </Link>
              </li>
              <li>
                <Link href="/" className="pinterest" onClick={closeOffcanvas}>
                  <i className="fa fa-pinterest"></i>
                </Link>
              </li>
              <li>
                <Link href="/" className="instagram" onClick={closeOffcanvas}>
                  <i className="fa fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        id="offcanvas-add-cart"
        className={`offcanvas offcanvas-rightside offcanvas-add-cart-section${
          openOffcanvasId === "offcanvas-add-cart" ? " offcanvas-open" : ""
        }`}
      >
        <div className="offcanvas-header text-end">
          <button type="button" className="offcanvas-close" onClick={closeOffcanvas}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="offcanvas-add-cart-wrapper">
          <h4 className="offcanvas-title">Shopping Cart</h4>
          <ul className="offcanvas-cart">
            <li className="offcanvas-cart-item-single">
              <div className="offcanvas-cart-item-block">
                <Link href="/" className="offcanvas-cart-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/products_images/aments_products_image_6.jpg"
                    alt=""
                    className="offcanvas-cart-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-cart-item-content">
                  <Link href="/" className="offcanvas-cart-item-link" onClick={closeOffcanvas}>
                    Car Wheel
                  </Link>
                  <div className="offcanvas-cart-item-details">
                    <span className="offcanvas-cart-item-details-quantity">1 x </span>
                    <span className="offcanvas-cart-item-details-price">$49.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-cart-item-delete text-end">
                <a href="#" className="offcanvas-cart-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
            <li className="offcanvas-cart-item-single">
              <div className="offcanvas-cart-item-block">
                <Link href="/" className="offcanvas-cart-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/categories_images/aments_categories_08.jpg"
                    alt=""
                    className="offcanvas-cart-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-cart-item-content">
                  <Link href="/" className="offcanvas-cart-item-link" onClick={closeOffcanvas}>
                    Car Vails
                  </Link>
                  <div className="offcanvas-cart-item-details">
                    <span className="offcanvas-cart-item-details-quantity">3 x </span>
                    <span className="offcanvas-cart-item-details-price">$500.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-cart-item-delete text-end">
                <a href="#" className="offcanvas-cart-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
            <li className="offcanvas-cart-item-single">
              <div className="offcanvas-cart-item-block">
                <Link href="/" className="offcanvas-cart-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/products_images/aments_products_image_2.jpg"
                    alt=""
                    className="offcanvas-cart-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-cart-item-content">
                  <Link href="/" className="offcanvas-cart-item-link" onClick={closeOffcanvas}>
                    Shock Absorber
                  </Link>
                  <div className="offcanvas-cart-item-details">
                    <span className="offcanvas-cart-item-details-quantity">1 x </span>
                    <span className="offcanvas-cart-item-details-price">$350.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-cart-item-delete text-end">
                <a href="#" className="offcanvas-cart-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
          </ul>
          <div className="offcanvas-cart-total-price">
            <span className="offcanvas-cart-total-price-text">Subtotal:</span>
            <span className="offcanvas-cart-total-price-value">$170.00</span>
          </div>
          <ul className="offcanvas-cart-action-button">
            <li className="offcanvas-cart-action-button-list">
              <Link
                href="/cart"
                className="offcanvas-cart-action-button-link"
                onClick={closeOffcanvas}
              >
                View Cart
              </Link>
            </li>
            <li className="offcanvas-cart-action-button-list">
              <Link
                href="/checkout"
                className="offcanvas-cart-action-button-link"
                onClick={closeOffcanvas}
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="offcanvas-wishlish"
        className={`offcanvas offcanvas-rightside offcanvas-add-cart-section${
          openOffcanvasId === "offcanvas-wishlish" ? " offcanvas-open" : ""
        }`}
      >
        <div className="offcanvas-header text-end">
          <button type="button" className="offcanvas-close" onClick={closeOffcanvas}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="offcanvas-wishlist-wrapper">
          <h4 className="offcanvas-title">Wishlist</h4>
          <ul className="offcanvas-wishlist">
            <li className="offcanvas-wishlist-item-single">
              <div className="offcanvas-wishlist-item-block">
                <Link href="/" className="offcanvas-wishlist-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/products_images/aments_products_image_6.jpg"
                    alt=""
                    className="offcanvas-wishlist-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-wishlist-item-content">
                  <Link href="/" className="offcanvas-wishlist-item-link" onClick={closeOffcanvas}>
                    Car Wheel
                  </Link>
                  <div className="offcanvas-wishlist-item-details">
                    <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                    <span className="offcanvas-wishlist-item-details-price">$49.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-wishlist-item-delete text-end">
                <a href="#" className="offcanvas-wishlist-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
            <li className="offcanvas-wishlist-item-single">
              <div className="offcanvas-wishlist-item-block">
                <Link href="/" className="offcanvas-wishlist-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/categories_images/aments_categories_08.jpg"
                    alt=""
                    className="offcanvas-wishlist-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-wishlist-item-content">
                  <Link href="/" className="offcanvas-wishlist-item-link" onClick={closeOffcanvas}>
                    Car Vails
                  </Link>
                  <div className="offcanvas-wishlist-item-details">
                    <span className="offcanvas-wishlist-item-details-quantity">3 x </span>
                    <span className="offcanvas-wishlist-item-details-price">$500.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-wishlist-item-delete text-end">
                <a href="#" className="offcanvas-wishlist-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
            <li className="offcanvas-wishlist-item-single">
              <div className="offcanvas-wishlist-item-block">
                <Link href="/" className="offcanvas-wishlist-item-image-link" onClick={closeOffcanvas}>
                  <Image
                    src="/assets/images/products_images/aments_products_image_2.jpg"
                    alt=""
                    className="offcanvas-wishlist-image"
                    width={90}
                    height={90}
                  />
                </Link>
                <div className="offcanvas-wishlist-item-content">
                  <Link href="/" className="offcanvas-wishlist-item-link" onClick={closeOffcanvas}>
                    Shock Absorber
                  </Link>
                  <div className="offcanvas-wishlist-item-details">
                    <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                    <span className="offcanvas-wishlist-item-details-price">$350.00</span>
                  </div>
                </div>
              </div>
              <div className="offcanvas-wishlist-item-delete text-end">
                <a href="#" className="offcanvas-wishlist-item-delete" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-trash-o"></i>
                </a>
              </div>
            </li>
          </ul>
          <ul className="offcanvas-wishlist-action-button">
            <li className="offcanvas-wishlist-action-button-list">
              <Link
                href="/wishlist"
                className="offcanvas-wishlist-action-button-link"
                onClick={closeOffcanvas}
              >
                View wishlist
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="offcanvas-overlay"
        style={{ display: openOffcanvasId ? "block" : "none" }}
        onClick={closeOffcanvas}
      />
    </>
  );
}

