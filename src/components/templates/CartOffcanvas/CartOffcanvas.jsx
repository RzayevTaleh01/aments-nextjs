"use client";

import Image from "next/image";
import Link from "next/link";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./CartOffcanvas.module.scss";

export default function CartOffcanvas({ isOpen, onClose }) {
  return (
    <OffcanvasPanel
      id="offcanvas-add-cart"
      className={cn(styles, "offcanvas offcanvas-rightside offcanvas-add-cart-section")}
      isOpen={isOpen}
      openClassName={cn(styles, "offcanvas-open")}
      headerClassName={cn(styles, "offcanvas-header text-end")}
      closeButtonClassName={cn(styles, "offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cn(styles, "offcanvas-add-cart-wrapper")}>
        <h4 className={cn(styles, "offcanvas-title")}>Shopping Cart</h4>
        <ul className={cn(styles, "offcanvas-cart")}>
          <li className={cn(styles, "offcanvas-cart-item-single")}>
            <div className={cn(styles, "offcanvas-cart-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_6.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-cart-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-cart-item-link")} onClick={onClose}>
                  Car Wheel
                </Link>
                <div className={cn(styles, "offcanvas-cart-item-details")}>
                  <span className={cn(styles, "offcanvas-cart-item-details-quantity")}>1 x </span>
                  <span className={cn(styles, "offcanvas-cart-item-details-price")}>$49.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-cart-item-delete text-end")}>
              <button type="button" aria-label="Delete" className={cn(styles, "offcanvas-cart-item-delete p-0 border-0 bg-transparent")}>
                <Icon name="FaTrashAlt" size={16} />
              </button>
            </div>
          </li>
          <li className={cn(styles, "offcanvas-cart-item-single")}>
            <div className={cn(styles, "offcanvas-cart-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/categories_images/aments_categories_08.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-cart-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-cart-item-link")} onClick={onClose}>
                  Car Vails
                </Link>
                <div className={cn(styles, "offcanvas-cart-item-details")}>
                  <span className={cn(styles, "offcanvas-cart-item-details-quantity")}>3 x </span>
                  <span className={cn(styles, "offcanvas-cart-item-details-price")}>$500.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-cart-item-delete text-end")}>
              <button type="button" aria-label="Delete" className={cn(styles, "offcanvas-cart-item-delete p-0 border-0 bg-transparent")}>
                <Icon name="FaTrashAlt" size={16} />
              </button>
            </div>
          </li>
          <li className={cn(styles, "offcanvas-cart-item-single")}>
            <div className={cn(styles, "offcanvas-cart-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_2.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-cart-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-cart-item-link")} onClick={onClose}>
                  Shock Absorber
                </Link>
                <div className={cn(styles, "offcanvas-cart-item-details")}>
                  <span className={cn(styles, "offcanvas-cart-item-details-quantity")}>1 x </span>
                  <span className={cn(styles, "offcanvas-cart-item-details-price")}>$350.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-cart-item-delete text-end")}>
              <button type="button" aria-label="Delete" className={cn(styles, "offcanvas-cart-item-delete p-0 border-0 bg-transparent")}>
                <Icon name="FaTrashAlt" size={16} />
              </button>
            </div>
          </li>
        </ul>
        <div className={cn(styles, "offcanvas-cart-total-price")}>
          <span className={cn(styles, "offcanvas-cart-total-price-text")}>Subtotal:</span>
          <span className={cn(styles, "offcanvas-cart-total-price-value")}>$170.00</span>
        </div>
        <ul className={cn(styles, "offcanvas-cart-action-button")}>
          <li className={cn(styles, "offcanvas-cart-action-button-list")}>
            <Link href="/cart" className={cn(styles, "offcanvas-cart-action-button-link")} onClick={onClose}>
              View Cart
            </Link>
          </li>
          <li className={cn(styles, "offcanvas-cart-action-button-list")}>
            <Link href="/checkout" className={cn(styles, "offcanvas-cart-action-button-link")} onClick={onClose}>
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </OffcanvasPanel>
  );
}
