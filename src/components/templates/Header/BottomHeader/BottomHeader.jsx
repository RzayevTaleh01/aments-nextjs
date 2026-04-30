"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui";
import styles from "./BottomHeader.module.scss";

function isMatchActive(isActive, activeMatch) {
  if (!activeMatch) return false;
  if (Array.isArray(activeMatch)) return activeMatch.some((m) => isActive(m));
  return isActive(activeMatch);
}

export default function BottomHeader({ isSticky, isActive, BottomHeaderData = [] }) {
  return (
    <div className={cn(styles, `header-bottom sticky-header${isSticky ? " sticky" : ""}`)}>
      <div className={cn(styles, "container")}>
        <div className={cn(styles, "row")}>
          <div className={cn(styles, "col-12")}>
            <div className={cn(styles, "main-menu")}>
              <nav>
                <ul>
                  {BottomHeaderData.map((item) => {
                    if (item.type === "mega") {
                      const active = isMatchActive(isActive, item.activeMatch ?? item.href);

                      return (
                        <li key={item.id} className={cn(styles, "has-dropdown has-megaitem")}>
                          <Link href={item.href} className={cn(styles, active && "active")}>
                            {item.label} <Icon name="FaAngleDown" size={14} />
                          </Link>
                          <div className={cn(styles, "mega-menu")}>
                            <ul className={cn(styles, "mega-menu-inner")}>
                              {item.mega.columns.map((col) => (
                                <li key={col.id} className={cn(styles, "mega-menu-item")}>
                                  <button type="button" className={cn(styles, "mega-menu-item-title")}>
                                    {col.title}
                                  </button>
                                  <ul className={cn(styles, "mega-menu-sub")}>
                                    {col.items.map((link) => (
                                      <li key={link.id}>
                                        <Link href={link.href}>{link.label}</Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                            {item.mega.banner ? (
                              <div className={cn(styles, "menu-banner")}>
                                <Link href={item.mega.banner.href} className={cn(styles, "menu-banner-link")}>
                                  <Image
                                    className={cn(styles, "menu-banner-img")}
                                    src={item.mega.banner.image.src}
                                    alt={item.mega.banner.image.alt ?? ""}
                                    width={item.mega.banner.image.width}
                                    height={item.mega.banner.image.height}
                                  />
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        </li>
                      );
                    }

                    if (item.type === "dropdown") {
                      const active = isMatchActive(isActive, item.activeMatch ?? item.href);

                      return (
                        <li key={item.id} className={cn(styles, "has-dropdown")}>
                          {item.href ? (
                            <Link href={item.href} className={cn(styles, active && "active")}>
                              {item.label} <Icon name="FaAngleDown" size={14} />
                            </Link>
                          ) : (
                            <button type="button" className={cn(styles, active && "active")}>
                              {item.label} <Icon name="FaAngleDown" size={14} />
                            </button>
                          )}
                          <ul className={cn(styles, "sub-menu")}>
                            {item.items.map((link) => (
                              <li key={link.id}>
                                <Link href={link.href}>{link.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={cn(styles, isMatchActive(isActive, item.activeMatch ?? item.href) && "active")}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
