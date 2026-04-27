"use client";

import Image from "next/image";
import Link from "next/link";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";

export default function HeaderMobileMenuOffcanvas({
  cx,
  isOpen,
  onClose,
  mobileMenuRef,
}) {
  return (
    <OffcanvasPanel
      id="mobile-menu-offcanvas"
      className={cx("offcanvas offcanvas-leftside offcanvas-mobile-menu-section")}
      isOpen={isOpen}
      openClassName={cx("offcanvas-open")}
      headerClassName={cx("offcanvas-header d-flex justify-content-end")}
      closeButtonClassName={cx("offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cx("offcanvas-mobile-menu-wrapper")}>
        <div className={cx("mobile-menu-top")}>
          <span>Welcome to our store!</span>
          <ul className={cx("mobile-menu-user-menu")}>
            <li>
              <Link className={cx("header-user-menu-link")} href="/compare" onClick={onClose}>
                <Icon name="FaRetweet" size={14} /> Compare (0)
              </Link>
            </li>
            <li className={cx("has-mobile-user-dropdown")}>
              <Link className={cx("mobile-user-menu-link")} href="/" onClick={onClose}>
                Setting
              </Link>
              <ul className={cx("mobile-user-sub-menu")}>
                <li>
                  <Link href="/checkout" onClick={onClose}>
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link href="/my-account" onClick={onClose}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/cart" onClick={onClose}>
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" onClick={onClose}>
                    Wishlist
                  </Link>
                </li>
              </ul>
            </li>
            <li className={cx(" has-mobile-user-dropdown")}>
              <Link className={cx("mobile-user-menu-link")} href="/" onClick={onClose}>
                $ USD
              </Link>
              <ul className={cx("mobile-user-sub-menu")}>
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
            <li className={cx("has-mobile-user-dropdown")}>
              <Link className={cx("mobile-user-menu-link")} href="/" onClick={onClose}>
                English
              </Link>
              <ul className={cx("mobile-user-sub-menu")}>
                <li>
                  <Link href="/" onClick={onClose}>
                    <Image
                      className={cx("user-sub-menu-link-icon")}
                      src="/assets/images/icon/lang-en.png"
                      alt=""
                      width={16}
                      height={11}
                    />{" "}
                    English
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={onClose}>
                    <Image
                      className={cx("user-sub-menu-link-icon")}
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
        <div className={cx("mobile-menu-center")}>
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
          <div className={cx("mobile-menu-customer-support")}>
            <div className={cx("mobile-menu-customer-support-icon")}>
              <Image src="/assets/images/icon/support-icon.png" alt="" width={48} height={48} />
            </div>
            <div className={cx("mobile-menu-customer-support-text")}>
              <span>Customer Support</span>
              <a className={cx("mobile-menu-customer-support-text-phone")} href="tel:(08)123456789">
                (08) 123 456 789
              </a>
            </div>
          </div>
          <ul className={cx("mobile-action-icon")}>
            <li className={cx("mobile-action-icon-item")}>
              <Link href="/wishlist" className={cx("mobile-action-icon-link")} onClick={onClose}>
                <Icon name="FaHeart" />
                <span className={cx("mobile-action-icon-item-count")}>3</span>
              </Link>
            </li>
            <li className={cx("mobile-action-icon-item")}>
              <Link href="/cart" className={cx("mobile-action-icon-link")} onClick={onClose}>
                <Icon name="FaShoppingCart" />
                <span className={cx("mobile-action-icon-item-count")}>3</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("mobile-menu-bottom")}>
          <div className={cx("offcanvas-menu")} ref={mobileMenuRef}>
            <ul>
              <li>
                <a href="#">
                  <span>Home</span>
                </a>
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <Link href="/" onClick={onClose}>
                      Home 1
                    </Link>
                  </li>
                  <li>
                    <Link href="/home-2" onClick={onClose}>
                      Home 2
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <span>Shop</span>
                </a>
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <a href="#">Shop Layout</a>
                    <ul className={cx("mobile-sub-menu")}>
                      <li>
                        <Link href="/shop/grid/sidebar-left" onClick={onClose}>
                          Grid Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/grid/sidebar-right" onClick={onClose}>
                          Grid Right Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/full-width" onClick={onClose}>
                          Full Width
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/list/sidebar-left" onClick={onClose}>
                          List Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/list/sidebar-right" onClick={onClose}>
                          List Right Sidebar
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <a href="#">Shop Pages</a>
                    <ul className={cx("mobile-sub-menu")}>
                      <li>
                        <Link href="/cart" onClick={onClose}>
                          Cart
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist" onClick={onClose}>
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link href="/compare" onClick={onClose}>
                          Compare
                        </Link>
                      </li>
                      <li>
                        <Link href="/checkout" onClick={onClose}>
                          Checkout
                        </Link>
                      </li>
                      <li>
                        <Link href="/login" onClick={onClose}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link href="/my-account" onClick={onClose}>
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link href="/404" onClick={onClose}>
                          Error 404
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <a href="#">Product Single</a>
                    <ul className={cx("mobile-sub-menu")}>
                      <li>
                        <Link href="/product/default" onClick={onClose}>
                          Product Default
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/variable" onClick={onClose}>
                          Product Variable
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/affiliate" onClick={onClose}>
                          Product Referral
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/group" onClick={onClose}>
                          Product Group
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/single-slide" onClick={onClose}>
                          Product Slider
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/tab-left" onClick={onClose}>
                          Product Tab Left
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/tab-right" onClick={onClose}>
                          Product Tab Right
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/gallery-left" onClick={onClose}>
                          Product Gallery Left
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/gallery-right" onClick={onClose}>
                          Product Gallery Right
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/sticky-left" onClick={onClose}>
                          Product Sticky Left
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/sticky-right" onClick={onClose}>
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
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <a href="#">Blog Grid</a>
                    <ul className={cx("mobile-sub-menu")}>
                      <li>
                        <Link href="/blog/grid/sidebar-left" onClick={onClose}>
                          Blog Grid Sidebar left
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/grid/sidebar-right" onClick={onClose}>
                          Blog Grid Sidebar Right
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/blog/full-width" onClick={onClose}>
                      Blog Full Width
                    </Link>
                  </li>
                  <li>
                    <a href="#">Blog Single</a>
                    <ul className={cx("mobile-sub-menu")}>
                      <li>
                        <Link href="/blog/post/sidebar-left" onClick={onClose}>
                          Blog Single Sidebar left
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/post/sidebar-right" onClick={onClose}>
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
                <ul className={cx("mobile-sub-menu")}>
                  <li>
                    <Link href="/about-us" onClick={onClose}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/service" onClick={onClose}>
                      Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" onClick={onClose}>
                      Frequently Questions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" onClick={onClose}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/404" onClick={onClose}>
                      404 Page
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/contact-us" onClick={onClose}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <a className={cx("mobile-menu-email icon-text-end")} href="mailto:info@yourdomain.com">
            <Icon name="FaEnvelope" size={14} /> info@yourdomain.com
          </a>
          <ul className={cx("mobile-menu-social")}>
            <li>
              <Link href="/" className={cx("facebook")} onClick={onClose}>
                <Icon name="FaFacebookF" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cx("twitter")} onClick={onClose}>
                <Icon name="FaTwitter" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cx("youtube")} onClick={onClose}>
                <Icon name="FaYoutube" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cx("pinterest")} onClick={onClose}>
                <Icon name="FaPinterestP" size={14} />
              </Link>
            </li>
            <li>
              <Link href="/" className={cx("instagram")} onClick={onClose}>
                <Icon name="FaInstagram" size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </OffcanvasPanel>
  );
}
