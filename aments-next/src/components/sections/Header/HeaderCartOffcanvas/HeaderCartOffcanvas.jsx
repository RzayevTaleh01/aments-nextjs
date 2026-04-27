"use client";

import Image from "next/image";
import Link from "next/link";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";

export default function HeaderCartOffcanvas({ cx, isOpen, onClose }) {
  return (
    <OffcanvasPanel
      id="offcanvas-add-cart"
      className={cx("offcanvas offcanvas-rightside offcanvas-add-cart-section")}
      isOpen={isOpen}
      openClassName={cx("offcanvas-open")}
      headerClassName={cx("offcanvas-header text-end")}
      closeButtonClassName={cx("offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cx("offcanvas-add-cart-wrapper")}>
        <h4 className={cx("offcanvas-title")}>Shopping Cart</h4>
        <ul className={cx("offcanvas-cart")}>
          <li className={cx("offcanvas-cart-item-single")}>
            <div className={cx("offcanvas-cart-item-block")}>
              <Link href="/" className={cx("offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_6.jpg"
                  alt=""
                  className={cx("offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-cart-item-content")}>
                <Link href="/" className={cx("offcanvas-cart-item-link")} onClick={onClose}>
                  Car Wheel
                </Link>
                <div className={cx("offcanvas-cart-item-details")}>
                  <span className={cx("offcanvas-cart-item-details-quantity")}>1 x </span>
                  <span className={cx("offcanvas-cart-item-details-price")}>$49.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-cart-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-cart-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cx("offcanvas-cart-item-single")}>
            <div className={cx("offcanvas-cart-item-block")}>
              <Link href="/" className={cx("offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/categories_images/aments_categories_08.jpg"
                  alt=""
                  className={cx("offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-cart-item-content")}>
                <Link href="/" className={cx("offcanvas-cart-item-link")} onClick={onClose}>
                  Car Vails
                </Link>
                <div className={cx("offcanvas-cart-item-details")}>
                  <span className={cx("offcanvas-cart-item-details-quantity")}>3 x </span>
                  <span className={cx("offcanvas-cart-item-details-price")}>$500.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-cart-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-cart-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cx("offcanvas-cart-item-single")}>
            <div className={cx("offcanvas-cart-item-block")}>
              <Link href="/" className={cx("offcanvas-cart-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_2.jpg"
                  alt=""
                  className={cx("offcanvas-cart-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-cart-item-content")}>
                <Link href="/" className={cx("offcanvas-cart-item-link")} onClick={onClose}>
                  Shock Absorber
                </Link>
                <div className={cx("offcanvas-cart-item-details")}>
                  <span className={cx("offcanvas-cart-item-details-quantity")}>1 x </span>
                  <span className={cx("offcanvas-cart-item-details-price")}>$350.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-cart-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-cart-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
        </ul>
        <div className={cx("offcanvas-cart-total-price")}>
          <span className={cx("offcanvas-cart-total-price-text")}>Subtotal:</span>
          <span className={cx("offcanvas-cart-total-price-value")}>$170.00</span>
        </div>
        <ul className={cx("offcanvas-cart-action-button")}>
          <li className={cx("offcanvas-cart-action-button-list")}>
            <Link href="/cart" className={cx("offcanvas-cart-action-button-link")} onClick={onClose}>
              View Cart
            </Link>
          </li>
          <li className={cx("offcanvas-cart-action-button-list")}>
            <Link href="/checkout" className={cx("offcanvas-cart-action-button-link")} onClick={onClose}>
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </OffcanvasPanel>
  );
}
