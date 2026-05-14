"use client";

import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import { BRANDS_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";

const FALLBACK_IMAGE_SRC = "/assets/images/products_images/aments_products_image_1.jpg";

function toAssetUrl(raw) {
  if (!raw) return "";
  const src =
    typeof raw === "string"
      ? raw
      : typeof raw === "object"
        ? raw?.url ?? raw?.image ?? raw?.path ?? raw?.src ?? ""
        : String(raw);
  const v = String(src || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v) || v.startsWith("data:")) return v;
  const base = String(process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "").replace(/\/+$/, "");
  if (!base) return v;
  if (v.startsWith("/")) return `${base}${v}`;
  return `${base}/${v}`;
}

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

export default function Page() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    ApiService.get(BRANDS_ROUTE)
      .then((resp) => {
        const payload = resp?.data?.data ?? resp?.data ?? null;
        const list = extractArray(payload, ["brands", "brand"]);
        const mapped = (list || [])
          .map((b) => ({
            ...b,
            id: b?.id,
            name: b?.name ?? b?.title ?? "",
            imageSrc: toAssetUrl(b?.image ?? b?.logo ?? b?.icon ?? "") || FALLBACK_IMAGE_SRC,
          }))
          .filter((x) => x?.id != null && x?.name);

        if (!isActive) return;
        setBrands(mapped);
      })
      .catch(() => {
        if (!isActive) return;
        setBrands([]);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const productsLike = useMemo(() => {
    const safeBrands = Array.isArray(brands) ? brands : [];
    return safeBrands.map((b) => ({
      id: b.id,
      name: b.name,
      imageSrc: b.imageSrc || FALLBACK_IMAGE_SRC,
      href: `/products?brandId=${encodeURIComponent(String(b.id))}`,
    }));
  }, [brands]);

  return (
    <div>
      <Breadcrumb title="Brands" items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />

      <ProductCatalogList
        products={productsLike}
        withSidebar={false}
        defaultView="grid"
        showPagination={false}
        emptyMessage={isLoading ? "Yüklənir..." : "Brend tapılmadı"}
        enableClientSearch={false}
      />
    </div>
  );
}
