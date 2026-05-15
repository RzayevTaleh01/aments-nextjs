"use client";

import { cn } from "@/utils/cn";
import useShowPrice from "@/hooks/use-show-price";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import "./ProductDetailsSummary.module.scss";

export default function ProductDetailsSummary({ product }) {
  const { showPrice } = useShowPrice();
  const { staticContent } = useInitial();
  if (!product) return null;


  const brandName = product?.brand?.name ?? product?.brand ?? "";
  const markName = product?.mark?.name ?? product?.mark ?? "";
  const modelName = product?.model?.name ?? product?.model ?? "";

  return (
    <div className="product-details-content-area-sticky">
      <div className="product-details-text">
        <h4 className="title">{product.name}</h4>
        {brandName || markName || modelName ? (
          <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
            {brandName ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-secondary-subtle text-secondary-emphasis me-2">
                  {HelperTranslate({ defaultText: "Brand", translateText: staticContent?.productDetails__brand })}
                </span>
                <span>{brandName}</span>
              </div>
            ) : null}
            {markName ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-danger-subtle text-danger-emphasis me-2">
                  {HelperTranslate({ defaultText: "Mark", translateText: staticContent?.productDetails__mark })}
                </span>
                <span>{markName}</span>
              </div>
            ) : null}
            {modelName ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">
                  {HelperTranslate({ defaultText: "Model", translateText: staticContent?.productDetails__model })}
                </span>
                <span>{modelName}</span>
              </div>
            ) : null}
          </div>
        ) : null}
        {showPrice ? (
          <div className="price">
            {product.compareAt && <del>{product.compareAt}</del>}
            {product.price}
          </div>
        ) : null}
        {product.code || product.oem_code ? (
          <div className="mt-2">
            {product.code ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">
                  {HelperTranslate({ defaultText: "Code", translateText: staticContent?.productDetails__code })}
                </span>
                <span>{product.code}</span>
              </div>
            ) : null}
            {product.oem_code ? (
              <div className="mt-1">
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">
                  {HelperTranslate({ defaultText: "OEM", translateText: staticContent?.productDetails__oem })}
                </span>
                <span>{product.oem_code}</span>
              </div>
            ) : null}
            {product?.similar_oem_codes ? (
              <div className="mt-1 d-flex flex-wrap align-items-center gap-2">
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary">
                  {HelperTranslate({ defaultText: "Similar OEM", translateText: staticContent?.productDetails__similarOem })}
                </span>
                {String(product.similar_oem_codes)
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
                  .map((code) => (
                    <span key={code} className="badge rounded-pill text-bg-warning">
                      {code}
                    </span>
                  ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <p className={cn("product-description")}>
          {product.description || ""}
        </p>
      </div>
    </div>
  );
}
