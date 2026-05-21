"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ProductDetailsSummary from "@/components/templates/ProductDetailsSummary/ProductDetailsSummary";
import ProductDetailsGallery from "@/components/templates/ProductDetailsGallery/ProductDetailsGallery";
import ProductOffersTable from "@/components/templates/ProductOffersTable/ProductOffersTable";
import styles from "./ProductDetailsPage.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function ProductDetailsPage({ title, product, offerGroups = [], variant = "default" }) {
  const { staticContent } = useInitial();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const thumbPrevRef = useRef(null);
  const thumbNextRef = useRef(null);

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
    return Array.isArray(product?.galleryImages) ? product.galleryImages : [];
  }, [product]);

  const galleryVariant = variant === "default" ? "gallery-left" : variant;

  return (
    <div className={styles.scope}>
      {!product ? (
        <div className="container py-5">
          {HelperTranslate({ defaultText: "Məhsul tapılmadı", translateText: staticContent?.productDetailsPage__notFound })}
        </div>
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
          <ProductOffersTable product={product} groups={offerGroups} />
        </>
      )}
    </div>
  );
}

