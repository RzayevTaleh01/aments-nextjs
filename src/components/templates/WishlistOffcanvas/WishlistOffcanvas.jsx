"use client";

import Image from "next/image";
import Link from "next/link";
import { OffcanvasPanel } from "@/components/templates";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "../Header/Header.module.scss";

export default function WishlistOffcanvas({ isOpen, onClose }) {
  return (
    <OffcanvasPanel
      id="offcanvas-wishlish"
      className={cn(styles, "offcanvas offcanvas-rightside offcanvas-add-cart-section")}
      isOpen={isOpen}
      openClassName={cn(styles, "offcanvas-open")}
      headerClassName={cn(styles, "offcanvas-header text-end")}
      closeButtonClassName={cn(styles, "offcanvas-close")}
      closeIconName="FaTimes"
      onClose={onClose}
    >
      <div className={cn(styles, "offcanvas-wishlist-wrapper")}>
        <h4 className={cn(styles, "offcanvas-title")}>Wishlist</h4>
        <ul className={cn(styles, "offcanvas-wishlist")}>
          <li className={cn(styles, "offcanvas-wishlist-item-single")}>
            <div className={cn(styles, "offcanvas-wishlist-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_6.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-wishlist-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-wishlist-item-link")} onClick={onClose}>
                  Car Wheel
                </Link>
                <div className={cn(styles, "offcanvas-wishlist-item-details")}>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-quantity")}>1 x </span>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-price")}>$49.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cn(styles, "offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cn(styles, "offcanvas-wishlist-item-single")}>
            <div className={cn(styles, "offcanvas-wishlist-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/categories_images/aments_categories_08.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-wishlist-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-wishlist-item-link")} onClick={onClose}>
                  Car Vails
                </Link>
                <div className={cn(styles, "offcanvas-wishlist-item-details")}>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-quantity")}>3 x </span>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-price")}>$500.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cn(styles, "offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
          <li className={cn(styles, "offcanvas-wishlist-item-single")}>
            <div className={cn(styles, "offcanvas-wishlist-item-block")}>
              <Link href="/" className={cn(styles, "offcanvas-wishlist-item-image-link")} onClick={onClose}>
                <Image
                  src="/assets/images/products_images/aments_products_image_2.jpg"
                  alt=""
                  className={cn(styles, "offcanvas-wishlist-image")}
                  width={90}
                  height={90}
                />
              </Link>
              <div className={cn(styles, "offcanvas-wishlist-item-content")}>
                <Link href="/" className={cn(styles, "offcanvas-wishlist-item-link")} onClick={onClose}>
                  Shock Absorber
                </Link>
                <div className={cn(styles, "offcanvas-wishlist-item-details")}>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-quantity")}>1 x </span>
                  <span className={cn(styles, "offcanvas-wishlist-item-details-price")}>$350.00</span>
                </div>
              </div>
            </div>
            <div className={cn(styles, "offcanvas-wishlist-item-delete text-end")}>
              <a href="#" className={cn(styles, "offcanvas-wishlist-item-delete")} onClick={(e) => e.preventDefault()}>
                <Icon name="FaTrashAlt" size={16} />
              </a>
            </div>
          </li>
        </ul>
        <ul className={cn(styles, "offcanvas-wishlist-action-button")}>
          <li className={cn(styles, "offcanvas-wishlist-action-button-list")}>
            <Link href="/wishlist" className={cn(styles, "offcanvas-wishlist-action-button-link")} onClick={onClose}>
              View wishlist
            </Link>
          </li>
        </ul>
      </div>
    </OffcanvasPanel>
  );
}
