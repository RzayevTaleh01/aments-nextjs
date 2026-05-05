"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import OffcanvasPanel from "@/components/templates/OffcanvasPanel/OffcanvasPanel";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";
import { cn } from "@/utils/cn";
import styles from "./MobileMenuOffcanvas.module.scss";

export default function MobileMenuOffcanvas({
  isOpen,
  onClose,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openByGroup, setOpenByGroup] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const { cartCount } = useCart();
  const qFromUrl = useMemo(() => String(searchParams?.get("q") ?? "").trim(), [searchParams]);

  useEffect(() => {
    setSearchQuery(qFromUrl);
  }, [qFromUrl]);

  const toggleGroup = useCallback((groupId, key) => {
    setOpenByGroup((prev) => ({
      ...prev,
      [groupId]: prev[groupId] === key ? null : key,
    }));
  }, []);

  const isGroupOpen = (groupId, key) => openByGroup[groupId] === key;

  const createToggleClickHandler = useCallback(
    (groupId, key) => () => {
      toggleGroup(groupId, key);
    },
    [toggleGroup]
  );

  const isRootHomeOpen = isGroupOpen("root", "home");
  const isRootShopOpen = isGroupOpen("root", "shop");
  const isRootPagesOpen = isGroupOpen("root", "pages");
  const isShopLayoutOpen = isGroupOpen("shop-sections", "layout");
  const isShopPagesOpen = isGroupOpen("shop-sections", "pages");
  const isShopProductOpen = isGroupOpen("shop-sections", "product");

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
          <span>Welcome to our store!</span>
          <ul className={cn(styles, "mobile-menu-user-menu")}>
            <li>
              <Link className={cn(styles, "header-user-menu-link")} href="/compare" onClick={onClose}>
                <Icon name="FaRetweet" size={14} /> Compare (0)
              </Link>
            </li>
            <li className={cn(styles, "has-mobile-user-dropdown")}>
              <Link className={cn(styles, "mobile-user-menu-link")} href="/" onClick={onClose}>
                Setting <Icon name="FaAngleDown" size={14} />
              </Link>
              <ul className={cn(styles, "mobile-user-sub-menu")}>
                <li>
                  <Link href="/checkout" onClick={onClose}>
                    Checkout
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <Link href="/my-account" onClick={onClose}>
                      My Account
                    </Link>
                  </li>
                ) : null}
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
                English <Icon name="FaAngleDown" size={14} />
              </Link>
              <ul className={cn(styles, "mobile-user-sub-menu")}>
                <li>
                  <Link href="/" onClick={onClose}>
                    <Image
                      className={cn(styles, "user-sub-menu-link-icon")}
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
                      className={cn(styles, "user-sub-menu-link-icon")}
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
                placeholder="OEM kod yazın..."
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
              <span>Customer Support</span>
              <a className={cn(styles, "mobile-menu-customer-support-text-phone")} href="tel:(08)123456789">
                (08) 123 456 789
              </a>
            </div>
          </div>
          <ul className={cn(styles, "mobile-action-icon")}>
            <li className={cn(styles, "mobile-action-icon-item")}>
              <Link href="/wishlist" className={cn(styles, "mobile-action-icon-link")} onClick={onClose}>
                <Icon name="FaHeart" />
                <span className={cn(styles, "mobile-action-icon-item-count")}>3</span>
              </Link>
            </li>
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
              <li className={cn(styles, isRootHomeOpen && "active")}>
                <button type="button" onClick={createToggleClickHandler("root", "home")}>
                  <span>Home</span>
                </button>
                <ul className={cn(styles, "mobile-sub-menu")}>
                  <li>
                    <Link href="/" onClick={onClose}>
                      Home 1
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className={cn(styles, "offcanvas-menu-expand")}
                  onClick={() => toggleGroup("root", "home")}
                  aria-label="Toggle Home menu"
                  aria-expanded={isRootHomeOpen}
                >
                  <Icon name={isRootHomeOpen ? "FaMinus" : "FaPlus"} size={14} />
                </button>
              </li>
              <li className={cn(styles, isRootShopOpen && "active")}>
                <button type="button" onClick={createToggleClickHandler("root", "shop")}>
                  <span>Shop</span>
                </button>
                <ul className={cn(styles, "mobile-sub-menu")}>
                  <li className={cn(styles, isShopLayoutOpen && "active")}>
                    <button type="button" onClick={createToggleClickHandler("shop-sections", "layout")}>
                      Shop Layout
                    </button>
                    <ul className={cn(styles, "mobile-sub-menu")}>
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
                    <button
                      type="button"
                      className={cn(styles, "offcanvas-menu-expand")}
                      onClick={() => toggleGroup("shop-sections", "layout")}
                      aria-label="Toggle Shop Layout menu"
                      aria-expanded={isShopLayoutOpen}
                    >
                      <Icon name={isShopLayoutOpen ? "FaMinus" : "FaPlus"} size={14} />
                    </button>
                  </li>
                </ul>
                <ul className={cn(styles, "mobile-sub-menu")}>
                  <li className={cn(styles, isShopPagesOpen && "active")}>
                    <button type="button" onClick={createToggleClickHandler("shop-sections", "pages")}>
                      Shop Pages
                    </button>
                    <ul className={cn(styles, "mobile-sub-menu")}>
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
                      {!isAuthenticated ? (
                        <li>
                          <Link href="/login" onClick={onClose}>
                            Login
                          </Link>
                        </li>
                      ) : null}
                      {isAuthenticated ? (
                        <li>
                          <Link href="/my-account" onClick={onClose}>
                            My Account
                          </Link>
                        </li>
                      ) : null}
                      <li>
                        <Link href="/404" onClick={onClose}>
                          Error 404
                        </Link>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className={cn(styles, "offcanvas-menu-expand")}
                      onClick={() => toggleGroup("shop-sections", "pages")}
                      aria-label="Toggle Shop Pages menu"
                      aria-expanded={isShopPagesOpen}
                    >
                      <Icon name={isShopPagesOpen ? "FaMinus" : "FaPlus"} size={14} />
                    </button>
                  </li>
                </ul>
                <ul className={cn(styles, "mobile-sub-menu")}>
                  <li className={cn(styles, isShopProductOpen && "active")}>
                    <button type="button" onClick={createToggleClickHandler("shop-sections", "product")}>
                      Product Single
                    </button>
                    <ul className={cn(styles, "mobile-sub-menu")}>
                      <li>
                        <Link href="/product/kapot" onClick={onClose}>
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
                    <button
                      type="button"
                      className={cn(styles, "offcanvas-menu-expand")}
                      onClick={() => toggleGroup("shop-sections", "product")}
                      aria-label="Toggle Product Single menu"
                      aria-expanded={isShopProductOpen}
                    >
                      <Icon name={isShopProductOpen ? "FaMinus" : "FaPlus"} size={14} />
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  className={cn(styles, "offcanvas-menu-expand")}
                  onClick={() => toggleGroup("root", "shop")}
                  aria-label="Toggle Shop menu"
                  aria-expanded={isRootShopOpen}
                >
                  <Icon name={isRootShopOpen ? "FaMinus" : "FaPlus"} size={14} />
                </button>
              </li>
              <li className={cn(styles, isRootPagesOpen && "active")}>
                <button type="button" onClick={createToggleClickHandler("root", "pages")}>
                  <span>Pages</span>
                </button>
                <ul className={cn(styles, "mobile-sub-menu")}>
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
                <button
                  type="button"
                  className={cn(styles, "offcanvas-menu-expand")}
                  onClick={() => toggleGroup("root", "pages")}
                  aria-label="Toggle Pages menu"
                  aria-expanded={isRootPagesOpen}
                >
                  <Icon name={isRootPagesOpen ? "FaMinus" : "FaPlus"} size={14} />
                </button>
              </li>
              <li>
                <Link href="/contact-us" onClick={onClose}>
                  Contact Us
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
