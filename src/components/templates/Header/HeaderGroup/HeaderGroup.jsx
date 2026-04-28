"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import BottomHeader from "../BottomHeader";
import styles from "./HeaderGroup.module.scss";

export default function HeaderGroup({
  isSticky,
  isActive,
  onOffcanvasToggle,
  BottomHeaderData,
  topHeaderData,
}) {
  const settingsLabel = topHeaderData?.settingsLabel ?? "Setting";
  const settingsItems = topHeaderData?.settings ?? [];

  const currencyItems = topHeaderData?.currencies ?? [];
  const currencyLabel =
    topHeaderData?.currencyLabel ??
    (typeof currencyItems[0] === "string" ? currencyItems[0] : currencyItems[0]?.label) ??
    "$ USD";

  const languageItems = topHeaderData?.languages ?? [];
  const languageLabel =
    topHeaderData?.languageLabel ??
    (typeof languageItems[0] === "string" ? languageItems[0] : languageItems[0]?.label) ??
    "English";

  const compare = topHeaderData?.compare ?? { href: "/compare", label: "Compare (0)", iconName: "FaRetweet" };

  return (
    <header className={cn(styles, "header-section d-lg-block d-none")}>
      <div className={cn(styles, "header-top")}>
        <div className={cn(styles, "container")}>
          <div className={cn(styles, "row d-flex justify-content-between align-items-center")}>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-top--left")}>
                <span>{topHeaderData?.welcomeText ?? "Welcome to our store!"}</span>
              </div>
            </div>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-top--right")}>
                <ul className={cn(styles, "header-user-menu")}>
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      {settingsLabel} <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
                      {settingsItems.map((item) => (
                        <li key={item.href ?? item.label}>
                          <Link href={item.href ?? "/"}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      {currencyLabel} <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
                      {currencyItems.map((item) => {
                        const label = typeof item === "string" ? item : item.label;
                        const href = typeof item === "string" ? "/" : item.href ?? "/";
                        return (
                          <li key={label}>
                            <Link href={href}>{label}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li className={cn(styles, "has-user-dropdown")}>
                    <Link href="/">
                      {languageLabel} <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "user-sub-menu")}>
                      {languageItems.map((item) => {
                        const label = typeof item === "string" ? item : item.label;
                        const href = typeof item === "string" ? "/" : item.href ?? "/";
                        const iconSrc = typeof item === "string" ? null : item.iconSrc;

                        return (
                          <li key={label}>
                            <Link href={href}>
                              {iconSrc ? (
                                <>
                                  <Image
                                    className={cn(styles, "user-sub-menu-in-icon")}
                                    src={iconSrc}
                                    alt={label ?? ""}
                                    width={16}
                                    height={11}
                                  />{" "}
                                </>
                              ) : null}
                              {label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li>
                    <Link href={compare.href ?? "/compare"}>
                      <Icon name={compare.iconName ?? "FaRetweet"} size={14} /> {compare.label ?? "Compare (0)"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(styles, "header-center")}>
        <div className={cn(styles, "container")}>
          <div className={cn(styles, "row d-flex justify-content-between align-items-center")}>
            <div className={cn(styles, "col-3")}>
              <div className={cn(styles, "header-logo")}>
                <Link href="/">
                  <Image src="/assets/images/logo/logo.png" alt="" width={140} height={40} />
                </Link>
              </div>
            </div>
            <div className={cn(styles, "col-6")}>
              <div className={cn(styles, "header-search")}>
                <form action="#" method="post">
                  <div className={cn(styles, "header-search-box default-search-style d-flex")}>
                    <input
                      className={cn(styles, "default-search-style-input-box border-around border-right-none")}
                      type="search"
                      placeholder="Search entire store here ..."
                      required
                    />
                    <button className={cn(styles, "default-search-style-input-btn")} type="submit">
                      <Icon name="FaSearch" size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={cn(styles, "col-3 text-end")}>
              <ul className={cn(styles, "header-action-icon")}>
                <li>
                  <a href="#offcanvas-wishlish" className={cn(styles, "offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaHeart" />
                    <span className={cn(styles, "header-action-icon-item-count")}>3</span>
                  </a>
                </li>
                <li>
                  <a href="#offcanvas-add-cart" className={cn(styles, "offcanvas-toggle")} onClick={onOffcanvasToggle}>
                    <Icon name="FaShoppingCart" />
                    <span className={cn(styles, "header-action-icon-item-count")}>3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomHeader isSticky={isSticky} isActive={isActive} BottomHeaderData={BottomHeaderData} />
    </header>
  );
}
