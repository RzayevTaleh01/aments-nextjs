"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useCart } from "@/context/ui-drawers-context";
import BottomHeader from "../BottomHeader";
import styles from "./HeaderGroup.module.scss";

function buildDisplayName(user) {
  return user?.username || user?.email || "My Account";
}

function buildInitials(displayName) {
  const parts = String(displayName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase() || "U";
}

export default function HeaderGroup({
  isSticky,
  isActive,
  onOffcanvasToggle,
  BottomHeaderData,
  topHeaderData,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  const { cartCount } = useCart();

  const displayName = buildDisplayName(session?.user);
  const initials = buildInitials(displayName);

  const topLinks = topHeaderData?.links ?? [];
  const filteredTopLinks = topLinks.filter((x) => {
    if (!x) return false;
    if (isAuthenticated) return x?.id !== "login" && x?.id !== "register";
    return x?.id !== "my-account";
  });

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
                  {filteredTopLinks.map((item) => {
                    const hasDropdown = Array.isArray(item.children) && item.children.length > 0;
                    const parentHref = item.href && item.href !== "#" ? item.href : "/";
                    const itemKey = item.id ?? item.href ?? item.label;

                    if (!hasDropdown) {
                      return (
                        <li key={itemKey}>
                          <Link href={parentHref}>
                            {item.iconName ? <Icon name={item.iconName} size={14} /> : null} {item.label}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={itemKey} className={cn(styles, "has-user-dropdown")}>
                        <Link href={parentHref}>
                          {item.label} <Icon name="FaAngleDown" size={14} />
                        </Link>
                        <ul className={cn(styles, "user-sub-menu")}>
                          {item.children.map((child) => (
                            <li key={`${itemKey}-${child.id ?? child.label ?? child.href}`}>
                              <Link href={child.href && child.href !== "#" ? child.href : "/"}>
                                {child.iconSrc ? (
                                  <Image
                                    className={cn(styles, "user-sub-menu-in-icon")}
                                    src={child.iconSrc}
                                    alt={child.label ?? ""}
                                    width={16}
                                    height={11}
                                  />
                                ) : null}
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
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
                <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
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
                  <button
                    type="button"
                    className={cn(styles, "offcanvas-toggle")}
                    data-offcanvas-id="offcanvas-add-cart"
                    onClick={onOffcanvasToggle}
                    aria-label="Open cart"
                  >
                    <Icon name="FaShoppingCart" />
                    <span className={cn(styles, "header-action-icon-item-count")}>{cartCount}</span>
                  </button>
                </li>
                {isAuthenticated ? (
                  <li className={cn(styles, "profile-menu")}>
                    <Link href="/my-account" className={cn(styles, "profile-trigger")}>
                      <span className={cn(styles, "profile-avatar")}>
                        <Icon name="FaUserCircle" size={28} />
                      </span>
                      <span className={cn(styles, "profile-name")}>{displayName}</span>
                      <Icon name="FaAngleDown" size={14} />
                    </Link>
                    <ul className={cn(styles, "profile-sub-menu")}>
                      <li>
                        <button
                          type="button"
                          className={cn(styles, "profile-logout")}
                          onClick={async () => {
                            const callbackUrl = `${process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL ?? ""}/`;
                            await signOut({ redirect: false, callbackUrl });
                            router.push("/");
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomHeader isSticky={isSticky} isActive={isActive} BottomHeaderData={BottomHeaderData} />
    </header>
  );
}
