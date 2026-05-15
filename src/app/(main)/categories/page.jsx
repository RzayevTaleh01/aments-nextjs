"use client";

import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductCategorySingle from "@/components/templates/ProductCategorySingle/ProductCategorySingle";
import { CATEGORIES_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import UiLoader from "@/components/ui/Loader/Loader";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

const FALLBACK_IMAGE_SRC = "/assets/images/categories_images/aments_categories_01.jpg";

function extractArray(payload, preferredKeys = []) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  if (Array.isArray(payload.data)) return payload.data;

  for (const k of preferredKeys) {
    if (Array.isArray(payload[k])) return payload[k];
  }

  const nested = payload.data;
  if (nested && typeof nested === "object") {
    for (const k of preferredKeys) {
      if (Array.isArray(nested[k])) return nested[k];
    }
  }

  return [];
}

function buildCategoryItemsLabel(cat) {
  const countCandidates = [cat?.order_count, cat?.ordersCount, cat?.orders_count, cat?.products_count, cat?.product_count, cat?.count];
  const count = countCandidates.find((v) => typeof v === "number" || (typeof v === "string" && v.trim() !== ""));
  const n = Number(count ?? 0);
  if (!Number.isFinite(n)) return "";
  return `(${n} Items)`;
}

export default function Page() {
  const { staticContent } = useInitial();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    ApiService.get(CATEGORIES_ROUTE)
      .then((resp) => {
        const payload = resp?.data?.data ?? resp?.data ?? null;
        const list = extractArray(payload, ["categories", "category"]);
        const mapped = (list || [])
          .map((cat) => ({
            ...cat,
            id: cat?.id,
            title: cat?.title ?? cat?.name ?? "",
            imageSrc: cat?.image ?? cat?.icon ?? cat?.photo ?? cat?.thumbnail ?? FALLBACK_IMAGE_SRC,
            items: cat?.items ?? buildCategoryItemsLabel(cat),
          }))
          .filter((x) => x?.id != null && x?.title);

        if (!isActive) return;
        setCategories(mapped);
      })
      .catch(() => {
        if (!isActive) return;
        setCategories([]);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const safeCategories = useMemo(() => (Array.isArray(categories) ? categories : []), [categories]);

  return (
    <div>
      <UiLoader
        fullscreen={true}
        visible={isLoading}
        label={HelperTranslate({ defaultText: "Yüklənir...", translateText: staticContent?.common__loading })}
      />
      <Breadcrumb title="Categories" items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />

      <div className="product-catagory-wrapper section-top-gap-100">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <h3 className="section-title mb-0">All Categories</h3>
            </div>
            <div className="col-auto text-muted">{`Cəmi: ${safeCategories.length}`}</div>
          </div>

          <div className="row pt-3">
            {!isLoading && safeCategories.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light border mb-0">Kateqoriya tapılmadı</div>
              </div>
            ) : null}

            {safeCategories.map((cat) => (
              <div key={String(cat.id)} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <ProductCategorySingle
                  href={`/products?categoryId=${encodeURIComponent(String(cat.id))}`}
                  imageSrc={cat.imageSrc || FALLBACK_IMAGE_SRC}
                  title={cat.title}
                  items={cat.items}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
