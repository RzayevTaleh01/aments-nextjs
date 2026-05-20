"use client";

import { useEffect, useState } from "react";
import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductsCarousel from "@/components/templates/ProductsCarousel";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { companyLogos, home1HeroSlides, homeBanners } from "@/constants/home";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";

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

export default function HomePage({ popularCategories = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const res = await ApiService.get(ALL_PRODUCTS_ROUTE);
        const data = res?.data?.data ?? {};
        const list = Array.isArray(data?.products) ? data.products : [];
        const mapped = list.map((p) => {
          const imageSrc = p?.images?.[0]?.image ?? p?.image ?? "";
          const href = p?.id ? `/product/${p.id}` : "/404";
          const price = computeProductDisplayPrice(p);
          return { ...p, imageSrc, href, price };
        });
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
      <PopularCategoriesSection categories={popularCategories} />
      <BannerSection banners={homeBanners} />
      <ProductsCarousel title="Products" products={products} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
