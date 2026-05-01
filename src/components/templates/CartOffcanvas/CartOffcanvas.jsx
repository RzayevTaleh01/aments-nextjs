"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";
import { useCart } from "@/context/ui-drawers-context";
import { cn } from "@/utils/cn";
import styles from "./CartOffcanvas.module.scss";

export default function CartOffcanvas({ isOpen, onClose }) {
  const { status } = useSession();
  const showPrice = status === "authenticated";
  const { cartItems, cartSubtotalText, removeCartItem } = useCart();

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
          {cartItems.length ? (
            cartItems.map((item) => (
              <li key={item.key} className={cn(styles, "offcanvas-cart-item-single")}>
                <div className={cn(styles, "offcanvas-cart-item-block")}>
                  <Link href={item.href || "/product/default"} className={cn(styles, "offcanvas-cart-item-image-link")} onClick={onClose}>
                    <Image
                      src={item.imageSrc || "/assets/images/products_images/aments_products_image_1.jpg"}
                      alt={item.name || ""}
                      className={cn(styles, "offcanvas-cart-image")}
                      width={90}
                      height={90}
                    />
                  </Link>
                  <div className={cn(styles, "offcanvas-cart-item-content")}>
                    <Link href={item.href || "/product/default"} className={cn(styles, "offcanvas-cart-item-link")} onClick={onClose}>
                      {item.name}
                    </Link>
                    <div className={cn(styles, "offcanvas-cart-item-details")}>
                      <span className={cn(styles, "offcanvas-cart-item-details-quantity")}>{item.quantity} x </span>
                      <span className={cn(styles, "offcanvas-cart-item-details-price")}>{showPrice ? item.unitPriceText || item.unitPrice : null}</span>
                    </div>
                  </div>
                </div>
                <div className={cn(styles, "offcanvas-cart-item-delete text-end")}>
                  <button
                    type="button"
                    aria-label="Delete"
                    className={cn(styles, "offcanvas-cart-item-delete p-0 border-0 bg-transparent")}
                    onClick={() => removeCartItem(item.key)}
                  >
                    <Icon name="FaTrashAlt" size={16} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className={cn(styles, "offcanvas-cart-item-single")}>
              <div className={cn(styles, "offcanvas-cart-item-block")}>Cart is empty</div>
            </li>
          )}
        </ul>
        <div className={cn(styles, "offcanvas-cart-total-price")}>
          <span className={cn(styles, "offcanvas-cart-total-price-text")}>Subtotal:</span>
          <span className={cn(styles, "offcanvas-cart-total-price-value")}>{showPrice ? cartSubtotalText : null}</span>
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
