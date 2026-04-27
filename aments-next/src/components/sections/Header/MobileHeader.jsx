"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function MobileHeader({ onOpen }) {
  return (
    <div className="mobile-header-section d-block d-lg-none">
      <div className={`${styles["mobile-header-wrapper"]} mobile-header-wrapper`}>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div className="mobile-header--left">
                <Link href="/" className="mobile-logo-link">
                  <Image
                    src="/assets/images/logo/logo.png"
                    alt="Aments"
                    width={140}
                    height={40}
                    className="mobile-logo-img"
                  />
                </Link>
              </div>
              <div className="mobile-header--right">
                <button
                  type="button"
                  className={`${styles["mobile-menu"]} mobile-menu offcanvas-toggle`}
                  onClick={() => onOpen("menu")}
                >
                  <span className={`${styles["mobile-menu-dash"]} mobile-menu-dash`} />
                  <span className={`${styles["mobile-menu-dash"]} mobile-menu-dash`} />
                  <span className={`${styles["mobile-menu-dash"]} mobile-menu-dash`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

