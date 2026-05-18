"use client";

import { useEffect, useRef, useState } from "react";
import HeroHome from "@/components/sections/home/HeroHome/HeroHome";
import PopularCategoriesSection from "@/components/sections/home/PopularCategoriesSection/PopularCategoriesSection";
import BannerSection from "@/components/sections/home/BannerSection/BannerSection";
import ProductsCarousel from "@/components/templates/ProductsCarousel";
import CompanyLogoSection from "@/components/sections/home/CompanyLogoSection/CompanyLogoSection";
import { companyLogos, home1HeroSlides, homeBanners} from "@/constants/home";
import { ALL_PRODUCTS_ROUTE, STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/language-context";

export default function HomePage() {
  const { lang } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [popularCategoriesError, setPopularCategoriesError] = useState(null);
  const [products, setProducts] = useState([]);
  const popularToastShownRef = useRef(false);

  useEffect(() => {
    if (!popularCategoriesError) return;
    if (popularToastShownRef.current) return;
    popularToastShownRef.current = true;
    toast.error("Xəta! Zəhmət olmasa interneti/serveri yoxlayın.");
  }, [popularCategoriesError]);

  useEffect(() => {
    let isActive = true;
    setPopularCategoriesError(null);
    popularToastShownRef.current = false;

    (async () => {
      try {
        const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE, { params: { lang } });
        const list = res?.data?.data;
        const mapped = Array.isArray(list)
          ? list.map((cat) => ({
              ...cat,
              imageSrc: cat?.image,
            }))
          : [];
        if (!isActive) return;
        setCategories(mapped);
      } catch {
        if (!isActive) return;
        setCategories([]);
        setPopularCategoriesError("Request failed");
      }
    })();

    return () => {
      isActive = false;
    };
  }, [lang]);

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
          return { ...p, imageSrc, href };
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
      <PopularCategoriesSection categories={categories} />
      <BannerSection banners={homeBanners} />
      <ProductsCarousel title="Products" products={products} />
      <CompanyLogoSection logos={companyLogos} />
    </>
  );
}
