"use client";

import AddToCartModal from "./AddToCartModal";
import ProductOfferModal from "./ProductOfferModal";
import QuickviewModal from "./QuickviewModal";
import styles from "./GlobalModals.module.scss";

export default function GlobalModals() {
  return (
    <div className={styles.root}>
      <AddToCartModal />
      <ProductOfferModal />
      <QuickviewModal />
    </div>
  );
}

