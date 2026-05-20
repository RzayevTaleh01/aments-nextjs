"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import OffcanvasPanel from "@/components/templates/OffcanvasPanel";
import Icon from "@/components/ui/TemplateIcon";
import { useCart } from "@/context/cart-context";
import { cn } from "@/utils/cn";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import styles from "./CartOffcanvas.module.scss";

export default function CartOffcanvas({ isOpen, onClose }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const showPrice = isAuthenticated;
  const { cartItems, cartSubtotalText, removeCartItem } = useCart();
  const { staticContent } = useInitial();
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";

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
        <h4 className={cn(styles, "offcanvas-title")}>
          {HelperTranslate({ defaultText: "Shopping Cart", translateText: staticContent?.mobile__shoppingCart })}
        </h4>
        <ul className={cn(styles, "offcanvas-cart")}>
          {cartItems.length ? (
            cartItems.map((item) => {
              const rawImageSrc = item.imageSrc || item.image || "/assets/images/products_images/aments_products_image_1.jpg";
              const normalizedImageSrc = String(rawImageSrc || "").startsWith("uploads/") ? `/${rawImageSrc}` : rawImageSrc;
              const imageSrc = String(normalizedImageSrc || "").startsWith("/uploads") ? `${base}${normalizedImageSrc}` : normalizedImageSrc;

              return (
                <li key={item.key} className={cn(styles, "offcanvas-cart-item-single")}>
                  <div className={cn(styles, "offcanvas-cart-item-block")}>
                    <Link href={item.href || "/product/default"} className={cn(styles, "offcanvas-cart-item-image-link")} onClick={onClose}>
                      <Image src={imageSrc} alt={item.name || ""} className={cn(styles, "offcanvas-cart-image")} width={90} height={90} />
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
                      aria-label={HelperTranslate({ defaultText: "Delete", translateText: staticContent?.cart__delete })}
                      className={cn(styles, "offcanvas-cart-item-delete p-0 border-0 bg-transparent")}
                      onClick={() => removeCartItem(item.key)}
                    >
                      <Icon name="FaTrashAlt" size={16} />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className={cn(styles, "offcanvas-cart-item-single")}>
              <div className={cn(styles, "offcanvas-cart-item-block")}>
                {HelperTranslate({ defaultText: "Cart is empty", translateText: staticContent?.cart__empty })}
              </div>
            </li>
          )}
        </ul>
        <div className={cn(styles, "offcanvas-cart-total-price")}>
          <span className={cn(styles, "offcanvas-cart-total-price-text")}>
            {HelperTranslate({ defaultText: "Subtotal", translateText: staticContent?.cart__subtotal })}:
          </span>
          <span className={cn(styles, "offcanvas-cart-total-price-value")}>{showPrice ? cartSubtotalText : null}</span>
        </div>
        {isAuthenticated ? (
          <ul className={cn(styles, "offcanvas-cart-action-button")}>
            <li className={cn(styles, "offcanvas-cart-action-button-list")}>
              <Link href="/cart" className={cn(styles, "offcanvas-cart-action-button-link")} onClick={onClose}>
                {HelperTranslate({ defaultText: "View Cart", translateText: staticContent?.addToCartModal__viewCart })}
              </Link>
            </li>
            <li className={cn(styles, "offcanvas-cart-action-button-list")}>
              <Link href="/checkout" className={cn(styles, "offcanvas-cart-action-button-link")} onClick={onClose}>
                {HelperTranslate({ defaultText: "Checkout", translateText: staticContent?.addToCartModal__checkout })}
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </OffcanvasPanel>
  );
}
