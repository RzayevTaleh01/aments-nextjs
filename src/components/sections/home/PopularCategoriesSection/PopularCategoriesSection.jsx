"use client";

import { cn } from "@/utils/cn";
import ProductCategorySingle from "@/components/templates/ProductCategorySingle/ProductCategorySingle";
import Icon from "@/components/ui/TemplateIcon";
import Link from "next/link";
import styles from "./PopularCategoriesSection.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function PopularCategoriesSection({ categories = [] }) {
  const { staticContent } = useInitial();
  return (
    <div className={cn(styles.root, "product-catagory-section section-top-gap-100")}>
      <div className="section-content-gap">
        <div className="container">
          <div className="row">
            <div className="section-content">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="section-title mb-0">
                  {HelperTranslate({ defaultText: "Popular Categories", translateText: staticContent?.home__popularCategoriesTitle })}
                </h3>
                <Link href="/categories" className="text-danger text-decoration-none d-inline-flex align-items-center gap-2 fw-semibold">
                  <span>{HelperTranslate({ defaultText: "All Categories", translateText: staticContent?.home__allCategoriesLink })}</span>
                  <Icon name="FaChevronRight" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-catagory-wrapper">
        <div className="container">
          <div className="row">
            {categories.map((cat, idx) => {                      
              const id = cat?.id ?? idx;
              const title = cat.translations[1]?.name;
              const orderCount = Number(cat?.order_count ?? 0);
              const items = cat?.items ?? `(${Number.isFinite(orderCount) ? orderCount : 0} Items)`;
              const href = cat?.href ?? `/products?categoryId=${encodeURIComponent(String(cat?.id ?? ""))}`;
              const imageSrc = cat?.image;
console.log(cat);

              return (
                <div key={String(id)} className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <ProductCategorySingle href={href} imageSrc={imageSrc} title={title} items={items} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
