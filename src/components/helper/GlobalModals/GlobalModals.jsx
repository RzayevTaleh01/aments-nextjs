"use client";

import AddToCartModal from "./AddToCartModal";
import QuickviewModal from "./QuickviewModal";
import styles from "./GlobalModals.module.scss";

export default function GlobalModals() {
  return (
    <div className={styles.scope}>
      <AddToCartModal />
      <QuickviewModal />
    </div>
  );
}

