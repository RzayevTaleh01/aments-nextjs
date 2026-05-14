"use client";

import { useEffect, useState } from "react";
import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductsCarousel from "@/components/templates/ProductsCarousel";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { companyLogos, home1HeroSlides, homeBanners, popularCategories as fallbackPopularCategories } from "@/constants/home";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";

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

function pickFirstString(values) {
  for (const v of values) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function extractApiImage(product) {
  if (!product || typeof product !== "object") return "";

  const direct = pickFirstString([product.image, product.thumbnail, product.photo, product.img, product.imageUrl, product.image_url]);
  if (direct) return direct;

  const images = product.images;
  if (typeof images === "string" && images.trim()) return images.trim();
  if (Array.isArray(images)) {
    const first = images.find((x) => x != null);
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first === "object") {
      const nested = pickFirstString([first.image, first.url, first.path, first.src, first.file]);
      if (nested) return nested;
    }
  }

  return "";
}

function mapApiProductToUiProduct(p) {
  const slug = p?.slug;
  const firstStorageProduct = Array.isArray(p?.storageProducts) ? (p.storageProducts.find((sp) => sp?.price != null) ?? p.storageProducts[0]) : null;
  const priceValue = firstStorageProduct?.price;
  const price = typeof priceValue === "string" || typeof priceValue === "number" ? `${priceValue} AZN` : "";
  const apiImage = extractApiImage(p);
  const imageSrc = toAssetUrl(apiImage);
  return {
    ...p,
    imageSrc,
    href: p?.href ?? (p?.id ? `/product/${p.id}` : slug ? `/product/${slug}` : "/product/default"),
    price,
  };
}

export default function HomePage({ popularCategories }) {
  const categories = popularCategories?.length ? popularCategories : fallbackPopularCategories;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const res = await ApiService.get(ALL_PRODUCTS_ROUTE);
        const data = res?.data?.data ?? {};
        const list = Array.isArray(data?.products) ? data.products : [];
        const mapped = list.map(mapApiProductToUiProduct);
        if (!isActive) return;
        setProducts(mapped);
      } catch {
        if (!isActive) return;
        setProducts([]);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <HeroHome slides={home1HeroSlides} />
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductsCarousel title="Products" products={products} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
