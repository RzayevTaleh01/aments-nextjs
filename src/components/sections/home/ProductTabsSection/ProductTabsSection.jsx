"use client";

import { useMemo, useState } from "react";
import { Carousel } from "@/components/ui";
import { ProductInner } from "@/components/templates";
import { cn } from "@/utils/cn";
import styles from "./ProductTabsSection.module.scss";

export default function ProductTabsSection({ title, tabs }) {
  const defaultId = tabs?.[0]?.id;
  const [activeId, setActiveId] = useState(defaultId);

  const resolvedActiveId = useMemo(() => {
    if (!tabs?.length) return null;
    if (tabs.some((t) => t.id === activeId)) return activeId;
    return tabs[0].id;
  }, [activeId, tabs]);

  return (
    <div className={cn(styles.root, "product-tab-section section-top-gap-100")}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className="section-content d-flex justify-content-between align-items-md-center align-items-start flex-md-row flex-column">
              <h3 className="section-title">{title}</h3>
              <ul className={cn("nav", styles.tabList)}>
                {tabs.map((tab) => (
                  <li key={tab.id} className={styles.tabItem}>
                    <button
                      type="button"
                      className={cn(styles.tabButton, resolvedActiveId === tab.id && styles.tabButtonActive)}
                      onClick={() => setActiveId(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tab-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content tab-animate-zoom">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    id={tab.id}
                    className={cn(styles.tabPane, resolvedActiveId === tab.id && styles.tabPaneActive)}
                  >
                    <Carousel
                      items={tab.products}
                      navigation
                      breakpoints={{
                        0: { slidesPerView: 1.2, spaceBetween: 14 },
                        480: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 18 },
                        992: { slidesPerView: 4, spaceBetween: 20 },
                      }}
                      swiperClassName="product-default-slider product-default-slider-4grids-1row"
                      renderItem={(product) => <ProductInner product={product} />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
