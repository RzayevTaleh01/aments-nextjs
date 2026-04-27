"use client";

import Image from "next/image";
import Link from "next/link";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";

export default function HeaderWishlistOffcanvas({ cx, isOpen, onClose }) {
  return (
    <OffcanvasPanel
      id="offcanvas-wishlish"
      className={cx("offcanvas offcanvas-rightside offcanvas-add-cart-section")}
      isOpen={isOpen}
      openClassName={cx("offcanvas-open")}
      headerClassName={cx("offcanvas-header text-end")}
      closeButtonClassName={cx("offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cx("offcanvas-wishlist-wrapper")}>
        <h4 className={cx("offcanvas-title")}>Wishlist</h4>
        <ul className={cx("offcanvas-wishlist")}>
          <li className={cx("offcanvas-wishlist-item-single")}>
            <div className={cx("offcanvas-wishlist-item-block")}>
              <Link href="/" className={cx("offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_6.jpg"
                  alt=""
                  className={cx("offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-wishlist-item-content")}>
                <Link href="/" className={cx("offcanvas-wishlist-item-link")} onClick={onClose}>
                  Car Wheel
                </Link>
                <div className={cx("offcanvas-wishlist-item-details")}>
                  <span className={cx("offcanvas-wishlist-item-details-quantity")}>1 x </span>
                  <span className={cx("offcanvas-wishlist-item-details-price")}>$49.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cx("offcanvas-wishlist-item-single")}>
            <div className={cx("offcanvas-wishlist-item-block")}>
              <Link href="/" className={cx("offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/categories_images/aments_categories_08.jpg"
                  alt=""
                  className={cx("offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-wishlist-item-content")}>
                <Link href="/" className={cx("offcanvas-wishlist-item-link")} onClick={onClose}>
                  Car Vails
                </Link>
                <div className={cx("offcanvas-wishlist-item-details")}>
                  <span className={cx("offcanvas-wishlist-item-details-quantity")}>3 x </span>
                  <span className={cx("offcanvas-wishlist-item-details-price")}>$500.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cx("offcanvas-wishlist-item-single")}>
            <div className={cx("offcanvas-wishlist-item-block")}>
              <Link href="/" className={cx("offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_2.jpg"
                  alt=""
                  className={cx("offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cx("offcanvas-wishlist-item-content")}>
                <Link href="/" className={cx("offcanvas-wishlist-item-link")} onClick={onClose}>
                  Shock Absorber
                </Link>
                <div className={cx("offcanvas-wishlist-item-details")}>
                  <span className={cx("offcanvas-wishlist-item-details-quantity")}>1 x </span>
                  <span className={cx("offcanvas-wishlist-item-details-price")}>$350.00</span>
                </div>
              </div>
            </div>
            <div className={cx("offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cx("offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
        </ul>
        <ul className={cx("offcanvas-wishlist-action-button")}>
          <li className={cx("offcanvas-wishlist-action-button-list")}>
            <Link href="/wishlist" className={cx("offcanvas-wishlist-action-button-link")} onClick={onClose}>
              View wishlist
            </Link>
          </li>
        </ul>
      </div>
    </OffcanvasPanel>
  );
}
