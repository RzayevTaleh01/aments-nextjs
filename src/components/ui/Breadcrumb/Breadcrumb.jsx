"use client";

import Link from "next/link";
import styles from "./Breadcrumb.module.scss";
import { cn } from "@/utils/cn";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function Breadcrumb({ title, titleKey, items }) {
  const { staticContent } = useInitial();
  return (
    <div className="breadcrumb-section">
      <div className={cn(styles["breadcrumb-wrapper"], "breadcrumb-wrapper")}>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between justify-content-md-between align-items-center flex-md-row flex-column">
              <h3 className="breadcrumb-title">
                {HelperTranslate({
                  defaultText: title,
                  translateText: titleKey ? staticContent?.[titleKey] : undefined,
                })}
              </h3>
              <div className={cn(styles["breadcrumb-nav"], "breadcrumb-nav")}>
                <nav aria-label="breadcrumb">
                  <ul>
                    {items.map((item, idx) => {
                      const isLast = idx === items.length - 1;
                      const label = HelperTranslate({
                        defaultText: item.label,
                        translateText: item?.labelKey ? staticContent?.[item.labelKey] : undefined,
                      });
                      if (item.href && !isLast) {
                        return (
                          <li key={`${item.label}-${idx}`}>
                            <Link href={item.href}>{label}</Link>
                          </li>
                        );
                      }
                      return (
                        <li
                          key={`${item.label}-${idx}`}
                          className={isLast ? cn(styles.active, "active") : undefined}
                          aria-current={isLast ? "page" : undefined}
                        >
                          {label}
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
    </div>
  );
}

