"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products } from "@/constants/products";
import ProductDetailsSummary from "@/components/templates/ProductDetailsSummary/ProductDetailsSummary";
import ProductDetailsTabs from "@/components/templates/ProductDetailsTabs/ProductDetailsTabs";
import RelatedProductsCarousel from "@/components/templates/RelatedProductsCarousel/RelatedProductsCarousel";
import ProductDetailsGallery from "@/components/templates/ProductDetailsGallery/ProductDetailsGallery";
import ProductOffersTable from "@/components/templates/ProductOffersTable/ProductOffersTable";
import { PRODUCT_DETAIL_API_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import styles from "./ProductDetailsPage.module.scss";

function toAssetUrl(src) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;
  if (base && src.startsWith("/")) return `${base}${src}`;
  return src;
}

function mapApiProductToUiProduct(p) {
  const priceValue = p?.storageProducts?.[0]?.price;
  const price = typeof priceValue === "string" || typeof priceValue === "number" ? `${priceValue} AZN` : "";
  return {
    ...p,
    imageSrc: toAssetUrl(p?.image) ?? "/assets/images/products_images/aments_products_image_1.jpg",
    price,
  };
}

function buildProductDetailRoute(id) {
  return PRODUCT_DETAIL_API_ROUTE.replace(":id", String(id));
}

function buildOfferGroupsFromApiProduct(p) {
  const rows = (p?.storageProducts ?? []).map((sp) => ({
    img: p?.imageSrc ?? "/assets/images/products_images/aments_products_image_1.jpg",
    brand: p?.brand?.name ?? p?.brand ?? "",
    code: p?.code ?? p?.oem_code ?? "",
    name: p?.name ?? "",
    warehouse: sp?.storageId ? `Anbar #${sp.storageId}` : "Anbar",
    qty: Number(sp?.stockQuantity ?? 0),
    price: sp?.price ? `${sp.price} AZN` : "",
  }));

  if (rows.length === 0) return [];
  return [{ title: "Anbarlar", rows }];
}

export default function ProductDetailsPage({ title, breadcrumbLabel, productId, productSlug, productApiId, variant = "default" }) {
  const [apiProduct, setApiProduct] = useState(null);
  const [apiFailed, setApiFailed] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const thumbPrevRef = useRef(null);
  const thumbNextRef = useRef(null);
  const relatedPrevRef = useRef(null);
  const relatedNextRef = useRef(null);

  useEffect(() => {
    if (!productApiId) return;
    let isActive = true;

    (async () => {
      try {
        const res = await ApiService.get(buildProductDetailRoute(productApiId));
        const raw = res?.data?.data;
        if (!isActive) return;
        if (!raw) {
          setApiFailed(true);
          setApiProduct(null);
          return;
        }
        setApiFailed(false);
        setApiProduct(mapApiProductToUiProduct(raw));
      } catch {
        if (!isActive) return;
        setApiFailed(true);
        setApiProduct(null);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [productApiId]);

  const fallbackProduct =
    (productSlug ? products.find((p) => p.slug === productSlug) : null) ??
    (productId ? products.find((p) => p.id === productId) : null) ??
    null;

  const product = productApiId ? apiProduct : fallbackProduct;

  const safeThumbsSwiper = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#offers") return;

    const el = document.getElementById("offers");
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const productImages = useMemo(() => {
    const list = [];
    if (product?.imageSrc) list.push(product.imageSrc);
    for (const img of product?.images ?? []) {
      const src = toAssetUrl(img?.image);
      if (src) list.push(src);
    }
    if (list.length > 0) return list;
    return [
      "/assets/images/products_images/aments_products_image_1.jpg",
      "/assets/images/products_images/aments_products_image_2.jpg",
      "/assets/images/products_images/aments_products_image_3.jpg",
      "/assets/images/products_images/aments_products_image_4.jpg",
      "/assets/images/products_images/aments_products_image_5.jpg",
      "/assets/images/products_images/aments_products_image_6.jpg",
    ];
  }, [product]);

  const offerGroups = useMemo(() => buildOfferGroupsFromApiProduct(product), [product]);

  const galleryVariant = variant === "default" ? "gallery-left" : variant;

  const isLoading = Boolean(productApiId) && !apiFailed && !apiProduct;

  return (
    <div className={styles.scope}>
      {productApiId && apiFailed ? (
        <div className="container py-5">Məhsul tapılmadı</div>
      ) : isLoading || !product ? (
        <div className="container py-5">Yüklənir...</div>
      ) : (
        <>
          <Breadcrumb
            title={product.name || title}
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="section-top-gap-100">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <ProductDetailsGallery
                    galleryLargeImages={productImages}
                    galleryThumbImages={productImages}
                    safeThumbsSwiper={safeThumbsSwiper}
                    setThumbsSwiper={setThumbsSwiper}
                    activeImageIndex={activeImageIndex}
                    onActiveImageIndexChange={setActiveImageIndex}
                    thumbPrevRef={thumbPrevRef}
                    thumbNextRef={thumbNextRef}
                    variant={galleryVariant}
                  />
                </div>

                <div className="col-md-6">
                  <ProductDetailsSummary product={product} />
                </div>
              </div>
            </div>
          </div>

          <ProductOffersTable product={product} groups={offerGroups.length ? offerGroups : product?.offerGroups} />
          <ProductDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} product={product} />
          {/* <RelatedProductsCarousel products={products} prevRef={relatedPrevRef} nextRef={relatedNextRef} /> */}
        </>
      )}
    </div>
  );
}

