"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.scss";

export default function Offcanvas({ offcanvas }) {
  return (
    <>
      <div
        className={cn(
          styles["offcanvas-overlay"],
          "offcanvas-overlay",
          offcanvas.openId && cn(styles["offcanvas-overlay--active"], "offcanvas-overlay--active")
        )}
        onClick={() => offcanvas.close()}
      />

      <div
        className={cn(
          styles.offcanvas,
          "offcanvas",
          styles["offcanvas-leftside"],
          "offcanvas-leftside",
          "offcanvas-mobile-menu-section",
          offcanvas.isOpen("menu") && cn(styles["offcanvas-open"], "offcanvas-open")
        )}
      >
        <div className={cn(styles["offcanvas-header"], "offcanvas-header", "text-end")}>
          <button
            type="button"
            className={cn(styles["offcanvas-close"], "offcanvas-close")}
            aria-label="Close menu"
            onClick={() => offcanvas.close()}
          >
            <Icon name="FaTimes" size={20} />
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          <div className="mobile-menu-bottom">
            <div className={styles["offcanvas-menu"]}>
              <MobileMenu onNavigate={() => offcanvas.close()} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          styles.offcanvas,
          "offcanvas",
          styles["offcanvas-search-section"],
          "offcanvas-search-section",
          offcanvas.isOpen("search") && cn(styles["offcanvas-open"], "offcanvas-open")
        )}
      >
        <div className={cn(styles["offcanvas-header"], "offcanvas-header", "text-end")}>
          <button
            type="button"
            className={cn(styles["offcanvas-close"], "offcanvas-close")}
            aria-label="Close search"
            onClick={() => offcanvas.close()}
          >
            <Icon name="FaTimes" size={20} />
          </button>
        </div>
        <div className="offcanvas-search-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="offcanvas-search">
                  <form action="#" method="post">
                    <div className="offcanvas-search-box">
                      <input type="search" placeholder="Search entire store here ..." required />
                      <button type="submit">
                        <Icon name="FaSearch" size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          styles.offcanvas,
          "offcanvas",
          styles["offcanvas-rightside"],
          "offcanvas-rightside",
          "offcanvas-add-cart-section",
          offcanvas.isOpen("mini-cart") && cn(styles["offcanvas-open"], "offcanvas-open")
        )}
      >
        <div className={cn(styles["offcanvas-header"], "offcanvas-header", "text-end")}>
          <button
            type="button"
            className={cn(styles["offcanvas-close"], "offcanvas-close")}
            aria-label="Close cart"
            onClick={() => offcanvas.close()}
          >
            <Icon name="FaTimes" size={20} />
          </button>
        </div>

        <div className="offcanvas-add-cart-wrapper">
          <h4 className={styles["offcanvas-title"]}>Shopping Cart</h4>
          <ul className="offcanvas-cart">
            {[1, 2].map((n) => (
              <li key={n} className={styles["offcanvas-cart-item-single"]}>
                <div className={styles["offcanvas-cart-item-block"]}>
                  <Link href="#" className={styles["offcanvas-cart-item-image-link"]}>
                    <Image
                      src={`/assets/images/products_images/aments_products_image_${n}.jpg`}
                      alt=""
                      width={90}
                      height={90}
                      className={styles["offcanvas-cart-image"]}
                    />
                  </Link>
                  <div className="offcanvas-cart-item-content">
                    <Link href="#" className={styles["offcanvas-cart-item-link"]}>
                      Handbag fringilla
                    </Link>
                    <div className={styles["offcanvas-cart-item-details"]}>
                      <span className="offcanvas-cart-item-details-quantity">1 x </span>
                      <span className="offcanvas-cart-item-details-price">$65.00</span>
                    </div>
                  </div>
                </div>
                <div className="offcanvas-cart-item-delete text-end">
                  <button type="button" className="offcanvas-cart-item-delete" aria-label="Remove item">
                    <Icon name="FaTrashAlt" size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className={styles["offcanvas-cart-total-price"]}>
            <span className={styles["offcanvas-cart-total-price-text"]}>Subtotal:</span>
            <span className="offcanvas-cart-total-price-number">$130.00</span>
          </div>

          <ul className="offcanvas-cart-action-button">
            <li>
              <Link href="/cart" className={styles["offcanvas-cart-action-button-link"]}>
                View Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className={styles["offcanvas-cart-action-button-link"]}>
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={cn(
          styles.offcanvas,
          "offcanvas",
          styles["offcanvas-rightside"],
          "offcanvas-rightside",
          "offcanvas-add-cart-section",
          offcanvas.isOpen("wishlist") && cn(styles["offcanvas-open"], "offcanvas-open")
        )}
      >
        <div className={cn(styles["offcanvas-header"], "offcanvas-header", "text-end")}>
          <button
            type="button"
            className={cn(styles["offcanvas-close"], "offcanvas-close")}
            aria-label="Close wishlist"
            onClick={() => offcanvas.close()}
          >
            <Icon name="FaTimes" size={20} />
          </button>
        </div>

        <div className="offcanvas-wishlist-wrapper">
          <h4 className={styles["offcanvas-title"]}>Wishlist</h4>
          <ul className="offcanvas-wishlist">
            {[3, 4].map((n) => (
              <li key={n} className={styles["offcanvas-wishlist-item-single"]}>
                <div className={styles["offcanvas-wishlist-item-block"]}>
                  <Link href="#" className={styles["offcanvas-wishlist-item-image-link"]}>
                    <Image
                      src={`/assets/images/products_images/aments_products_image_${n}.jpg`}
                      alt=""
                      width={90}
                      height={90}
                      className={styles["offcanvas-wishlist-image"]}
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link href="#" className={styles["offcanvas-wishlist-item-link"]}>
                      Product Name
                    </Link>
                    <div className={styles["offcanvas-wishlist-item-details"]}>
                      <span className="offcanvas-wishlist-item-details-quantity">1 x </span>
                      <span className="offcanvas-wishlist-item-details-price">$120.00</span>
                    </div>
                  </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-end">
                  <button type="button" className="offcanvas-wishlist-item-delete" aria-label="Remove item">
                    <Icon name="FaTrashAlt" size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <ul className="offcanvas-wishlist-action-button">
            <li>
              <Link href="/wishlist" className={styles["offcanvas-wishlist-action-button-link"]}>
                View Wishlist
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

