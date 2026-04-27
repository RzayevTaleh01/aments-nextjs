"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";

export default function HeaderDesktop({
  cx,
  isSticky,
  isActive,
  onOffcanvasToggle,
}) {
  return (
    <header className={cx("header-section d-lg-block d-none")}>
      <div className={cx("header-top")}>
        <div className={cx("container")}>
          <div className={cx("row d-flex justify-content-between align-items-center")}>
            <div className={cx("col-6")}>
              <div className={cx("header-top--left")}>
                <span>Welcome to our store!</span>
              </div>
            </div>
            <div className={cx("col-6")}>
              <div className={cx("header-top--right")}>
                <ul className={cx("header-user-menu")}>
                  <li className={cx("has-user-dropdown")}>
                    <Link href="/">Setting</Link>
                    <ul className={cx("user-sub-menu")}>
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
                  <li className={cx("has-user-dropdown")}>
                    <Link href="/">$ USD</Link>
                    <ul className={cx("user-sub-menu")}>
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
                  <li className={cx("has-user-dropdown")}>
                    <Link href="/">English</Link>
                    <ul className={cx("user-sub-menu")}>
                      <li>
                        <Link href="/">
                          <Image
                            className={cx("user-sub-menu-in-icon")}
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
                            className={cx("user-sub-menu-in-icon")}
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
                      <Icon name="FaRetweet" size={14} /> Compare (0)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("header-center")}>
        <div className={cx("container")}>
          <div className={cx("row d-flex justify-content-between align-items-center")}>
            <div className={cx("col-3")}>
              <div className={cx("header-logo")}>
                <Link href="/">
                  <Image src="/assets/images/logo/logo.png" alt="" width={140} height={40} />
                </Link>
              </div>
            </div>
            <div className={cx("col-6")}>
              <div className={cx("header-search")}>
                <form action="#" method="post">
                  <div className={cx("header-search-box default-search-style d-flex")}>
                    <input
                      className={cx("default-search-style-input-box border-around border-right-none")}
                      type="search"
                      placeholder="Search entire store here ..."
                      required
                    />
                    <button className={cx("default-search-style-input-btn")} type="submit">
                      <Icon name="FaSearch" size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={cx("col-3 text-end")}>
              <ul className={cx("header-action-icon")}>
                <li>
                  <a href="#offcanvas-wishlish" className={cx("offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaHeart" />
                    <span className={cx("header-action-icon-item-count")}>3</span>
                  </a>
                </li>
                <li>
                  <a href="#offcanvas-add-cart" className={cx("offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaShoppingCart" />
                    <span className={cx("header-action-icon-item-count")}>3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={cx(`header-bottom sticky-header${isSticky ? " sticky" : ""}`)}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-12")}>
              <div className={cx("main-menu")}>
                <nav>
                  <ul>
                    <li className={cx("has-dropdown")}>
                      <Link className={cx(`${isActive("/") ? "active " : ""}main-menu-link`)} href="/">
                        Home <Icon name="FaAngleDown" size={14} />
                      </Link>
                      <ul className={cx("sub-menu")}>
                        <li>
                          <Link href="/">Home 1</Link>
                        </li>
                      </ul>
                    </li>
                    <li className={cx("has-dropdown has-megaitem")}>
                      <Link href="/product/default">
                        Shop <Icon name="FaAngleDown" size={14} />
                      </Link>
                      <div className={cx("mega-menu")}>
                        <ul className={cx("mega-menu-inner")}>
                          <li className={cx("mega-menu-item")}>
                            <a href="#" className={cx("mega-menu-item-title")} onClick={(e) => e.preventDefault()}>
                              Shop Layouts
                            </a>
                            <ul className={cx("mega-menu-sub")}>
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
                          <li className={cx("mega-menu-item")}>
                            <a href="#" className={cx("mega-menu-item-title")} onClick={(e) => e.preventDefault()}>
                              Other Pages
                            </a>
                            <ul className={cx("mega-menu-sub")}>
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
                          <li className={cx("mega-menu-item")}>
                            <a href="#" className={cx("mega-menu-item-title")} onClick={(e) => e.preventDefault()}>
                              Product Types
                            </a>
                            <ul className={cx("mega-menu-sub")}>
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
                          <li className={cx("mega-menu-item")}>
                            <a href="#" className={cx("mega-menu-item-title")} onClick={(e) => e.preventDefault()}>
                              Product Types
                            </a>
                            <ul className={cx("mega-menu-sub")}>
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
                        <div className={cx("menu-banner")}>
                          <Link href="/" className={cx("menu-banner-link")}>
                            <Image
                              className={cx("menu-banner-img")}
                              src="/assets/images/banner/menu-banner.jpg"
                              alt=""
                              width={320}
                              height={320}
                            />
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className={cx("has-dropdown")}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Pages <Icon name="FaAngleDown" size={14} />
                      </a>
                      <ul className={cx("sub-menu")}>
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
  );
}
