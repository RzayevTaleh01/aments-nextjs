"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeaderMobileBar({ cx, onOffcanvasToggle }) {
  return (
    <div className={cx("mobile-header-section d-block d-lg-none")}>
      <div className={cx("mobile-header-wrapper")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-12 d-flex justify-content-between align-items-center")}>
              <div className={cx("mobile-header--left")}>
                <Link href="/" className={cx("mobile-logo-link")}>
                  <Image
                    src="/assets/images/logo/logo.png"
                    alt=""
                    className={cx("mobile-logo-img")}
                    width={140}
                    height={40}
                  />
                </Link>
              </div>
              <div className={cx("mobile-header--right")}>
                <a
                  href="#mobile-menu-offcanvas"
                  className={cx("mobile-menu offcanvas-toggle")}
                  onClick={onOffcanvasToggle}
                >
                  <span className={cx("mobile-menu-dash")}></span>
                  <span className={cx("mobile-menu-dash")}></span>
                  <span className={cx("mobile-menu-dash")}></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

