"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import BottomHeader from "../BottomHeader";
import styles from "./HeaderGroup.module.scss";

export default function HeaderGroup({
  isSticky,
  isActive,
  onOffcanvasToggle,
  BottomHeaderData,
}) {
  return (
    <header className={cn(styles, "header-section d-lg-block d-none")}>
      <div className={cn(styles, "header-top")}>
        <div className={cn(styles, "container")}>
          <div className={cn(styles, "row d-flex justify-content-between align-items-center")}>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-top--left")}>
                <span>Welcome to our store!</span>
              </div>
            </div>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-top--right")}>
                <ul className={cn(styles, "header-user-menu")}>
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      Setting <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
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
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      $ USD <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
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
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      English <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
                      <li>
                        <Link href="/">
                          <Image
                            className={cn(styles, "user-sub-menu-in-icon")}
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
                            className={cn(styles, "user-sub-menu-in-icon")}
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

      <div className={cn(styles, "header-center")}>
        <div className={cn(styles, "container")}>
          <div className={cn(styles, "row d-flex justify-content-between align-items-center")}>
            <div className={cn(styles, "col-3")}>
              <div className={cn(styles, "header-logo")}>
                <Link href="/">
                  <Image src="/assets/images/logo/logo.png" alt="" width={140} height={40} />
                </Link>
              </div>
            </div>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-search")}>
                <form action="#" method="post">
                  <div className={cn(styles, "header-search-box default-search-style d-flex")}>
                    <input
                      className={cn(styles, "default-search-style-input-box border-around border-right-none")}
                      type="search"
                      placeholder="Search entire store here ..."
                      required
                    />
                    <button className={cn(styles, "default-search-style-input-btn")} type="submit">
                      <Icon name="FaSearch" size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={cn(styles, "col-3 text-end")}>
              <ul className={cn(styles, "header-action-icon")}>
                <li>
                  <a href="#offcanvas-wishlish" className={cn(styles, "offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaHeart" />
                    <span className={cn(styles, "header-action-icon-item-count")}>3</span>
                  </a>
                </li>
                <li>
                  <a href="#offcanvas-add-cart" className={cn(styles, "offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaShoppingCart" />
                    <span className={cn(styles, "header-action-icon-item-count")}>3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomHeader isSticky={isSticky} isActive={isActive} BottomHeaderData={BottomHeaderData} />
    </header>
  );
}
