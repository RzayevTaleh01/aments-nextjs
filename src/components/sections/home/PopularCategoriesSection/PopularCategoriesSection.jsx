"use client";

import { cn } from "@/utils/cn";
import ProductCategorySingle from "@/components/templates/ProductCategorySingle/ProductCategorySingle";
import Icon from "@/components/ui/TemplateIcon";
import Link from "next/link";
import styles from "./PopularCategoriesSection.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import { useLanguage } from "@/context/language-context";

function categoryTitle(cat, lang) {
  const direct = cat?.title ?? cat?.name ?? cat?.label;
  if (direct) return direct;

  const list = Array.isArray(cat?.translations) ? cat.translations : [];
  if (!list.length) return "";

  const normalized = String(lang ?? "")
    .trim()
    .split("-")[0]
    ?.toLowerCase();

  if (normalized) {
    const hit = list.find((t) => {
      const tag = String(t?.lang ?? t?.locale ?? t?.language ?? t?.code ?? t?.language_code ?? "")
        .trim()
        .toLowerCase();
      return tag && (tag === normalized || tag.startsWith(`${normalized}-`));
    });
    if (hit?.name || hit?.title) return hit?.name ?? hit?.title;
  }

  const first = list.find((t) => t?.name || t?.title);
  return first?.name ?? first?.title ?? "";
}

export default function PopularCategoriesSection({ categories = [] }) {
  const { staticContent } = useInitial();
  const { lang } = useLanguage();
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
              const title = categoryTitle(cat, lang);
              const orderCount = Number(cat?.order_count ?? 0);
              const items = cat?.items ?? `(${Number.isFinite(orderCount) ? orderCount : 0} Items)`;
              const href = cat?.href ?? `/products?categoryId=${encodeURIComponent(String(cat?.id ?? ""))}`;
              const imageSrc = cat?.imageSrc;
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
