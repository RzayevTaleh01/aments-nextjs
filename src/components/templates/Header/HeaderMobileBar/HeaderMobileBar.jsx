"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./HeaderMobileBar.module.scss";

export default function HeaderMobileBar({ onOffcanvasToggle }) {
  return (
    <div className={cn(styles, "mobile-header-section d-block d-lg-none")}>
      <div className={cn(styles, "mobile-header-wrapper")}>
        <div className={cn(styles, "container")}>
          <div className={cn(styles, "row")}>
            <div className={cn(styles, "col-12 d-flex justify-content-between align-items-center")}>
              <div className={cn(styles, "mobile-header--left")}>
                <Link href="/" className={cn(styles, "mobile-logo-link")}>
                  <Image
                    src="/assets/images/logo/logo.png"
                    alt=""
                    className={cn(styles, "mobile-logo-img")}
                    width={140}
                    height={40}
                  />
                </Link>
              </div>
              <div className={cn(styles, "mobile-header--right")}>
                <button
                  type="button"
                  className={cn(styles, "mobile-menu offcanvas-toggle")}
                  data-offcanvas-id="mobile-menu-offcanvas"
                  onClick={onOffcanvasToggle}
                  aria-label="Open menu"
                >
                  <span className={cn(styles, "mobile-menu-dash")}></span>
                  <span className={cn(styles, "mobile-menu-dash")}></span>
                  <span className={cn(styles, "mobile-menu-dash")}></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
