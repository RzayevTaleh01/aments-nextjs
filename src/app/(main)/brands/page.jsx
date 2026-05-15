"use client";

import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import { BRANDS_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import UiLoader from "@/components/ui/Loader/Loader";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

const FALLBACK_IMAGE_SRC = "/assets/images/products_images/aments_products_image_1.jpg";

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
  const { staticContent } = useInitial();
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
            imageSrc: b?.image ?? b?.logo ?? b?.icon ?? FALLBACK_IMAGE_SRC,
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
      <UiLoader
        fullscreen={true}
        visible={isLoading}
      />
      <Breadcrumb title="Brands" items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />

      <ProductCatalogList
        products={productsLike}
        withSidebar={false}
        defaultView="grid"
        showPagination={false}
        showCartIcon={false}
        emptyMessage={"Brend tapılmadı"}
        enableClientSearch={false}
      />
    </div>
  );
}
