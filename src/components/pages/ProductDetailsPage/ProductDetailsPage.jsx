"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products } from "@/constants/products";
import ProductDetailsSummary from "@/components/templates/ProductDetailsSummary/ProductDetailsSummary";
import ProductDetailsTabs from "@/components/templates/ProductDetailsTabs/ProductDetailsTabs";
import ProductDetailsGallery from "@/components/templates/ProductDetailsGallery/ProductDetailsGallery";
import ProductOffersTable from "@/components/templates/ProductOffersTable/ProductOffersTable";
import { PRODUCT_DETAIL_API_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import styles from "./ProductDetailsPage.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import UiLoader from "@/components/ui/Loader/Loader";

function parsePriceNumber(price) {
  if (typeof price === "number" && Number.isFinite(price)) return price;
  if (typeof price !== "string") return null;
  const normalized = price.replace(/\s+/g, " ").trim().replace(/,/g, ".");
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : null;
}

function extractCurrencyFromPriceText(priceText) {
  if (typeof priceText !== "string") return "AZN";
  const match = priceText.toUpperCase().match(/[A-Z]{3}/);
  return match?.[0] || "AZN";
}

function formatMoney(value, currency) {
  const n = typeof value === "number" ? value : parsePriceNumber(value);
  if (!Number.isFinite(n)) return currency ? `0.00 ${currency}` : "0.00";
  const text = n.toFixed(2);
  return currency ? `${text} ${currency}` : text;
}

function normalizePriceText(rawPrice, fallbackCurrency = "AZN") {
  if (typeof rawPrice === "number" && Number.isFinite(rawPrice)) return formatMoney(rawPrice, fallbackCurrency);
  if (typeof rawPrice !== "string") return "";
  const text = rawPrice.trim();
  if (!text) return "";
  const hasCurrency = /[A-Za-z]{3}/.test(text);
  if (hasCurrency) return text;
  const n = parsePriceNumber(text);
  if (!Number.isFinite(n)) return "";
  return formatMoney(n, fallbackCurrency);
}

function computeProductDisplayPrice(p) {
  const storageLists = Array.isArray(p?.storageLists) ? p.storageLists : null;
  const storageProducts = Array.isArray(p?.storageProducts) ? p.storageProducts : null;
  const entries = storageLists ?? storageProducts ?? [];
  if (!entries.length) return null;

  const rawPriceTexts = entries.map((x) => x?.price).filter((v) => v != null);
  if (!rawPriceTexts.length) return null;

  const currency = rawPriceTexts.map(extractCurrencyFromPriceText).find((x) => x && x !== "AZN") || "AZN";
  const parsed = rawPriceTexts
    .map((raw) => ({ raw, n: parsePriceNumber(raw) }))
    .filter((x) => Number.isFinite(x.n));

  if (!parsed.length) return null;

  if (parsed.length === 1) {
    const raw = parsed[0].raw;
    const normalized = normalizePriceText(raw, currency);
    return normalized || null;
  }

  let min = Infinity;
  let max = -Infinity;
  for (const x of parsed) {
    if (x.n < min) min = x.n;
    if (x.n > max) max = x.n;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (Math.abs(min - max) < 1e-9) return formatMoney(min, currency);
  return `${formatMoney(min, currency)} - ${formatMoney(max, currency)}`;
}

function mapApiProductToUiProduct(p) {
  const price = computeProductDisplayPrice(p);
  return {
    ...p,
    imageSrc: p?.image,
    price,
  };
}

function buildProductDetailRoute(id) {
  return PRODUCT_DETAIL_API_ROUTE.replace(":id", String(id));
}

function buildOfferGroupsFromApiProduct(p) {
  const entries = (Array.isArray(p?.storageLists) ? p.storageLists : null) ?? (p?.storageProducts ?? []);
  const currency = entries.map((x) => extractCurrencyFromPriceText(x?.price)).find((x) => x && x !== "AZN") || "AZN";
  const rows = entries.map((sp) => {
    const storageProductId = sp?.id ?? sp?.storageProductId ?? sp?.storage_product_id ?? sp?.storage_product?.id ?? null;
    const img = sp?.img ?? sp?.image ?? sp?.photo ?? p?.imageSrc;
    const brand = sp?.brand ?? sp?.brandName ?? sp?.brand?.name ?? p?.brand?.name ?? p?.brand ?? "";
    const code = sp?.code ?? sp?.oem_code ?? p?.code ?? p?.oem_code ?? "";
    const name = sp?.name ?? p?.name ?? "";
    const warehouse = sp?.warehouse ?? (sp?.storage?.name ?? (sp?.storageId ? `Anbar #${sp.storageId}` : "Anbar"));
    const qty = Number(sp?.qty ?? sp?.quantity ?? sp?.stockQuantity ?? 0);
    const price = normalizePriceText(sp?.price, currency);
    return {
      img,
      brand,
      code,
      name,
      warehouse,
      qty: Number.isFinite(qty) ? qty : 0,
      price,
      storageProductId,
    };
  });

  if (rows.length === 0) return [];
  return [{ title: "Anbarlar", rows }];
}

export default function ProductDetailsPage({ title, breadcrumbLabel, productId, productSlug, productApiId, variant = "default" }) {
  const { staticContent } = useInitial();
  const [apiProduct, setApiProduct] = useState(null);
  const [apiFailed, setApiFailed] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const thumbPrevRef = useRef(null);
  const thumbNextRef = useRef(null);

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
      const src = img?.image;
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
        <div className="container py-5">
          {HelperTranslate({ defaultText: "Məhsul tapılmadı", translateText: staticContent?.productDetailsPage__notFound })}
        </div>
      ) : isLoading || !product ? (
        <UiLoader
          fullscreen={true}
        />
      ) : (
        <>
          <Breadcrumb
            title={product.name || title}
            items={[
              { label: "Home", labelKey: "breadcrumb__home", href: "/" },
              { label: "Products", labelKey: "breadcrumb__products", href: "/products" },
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
        </>
      )}
    </div>
  );
}

