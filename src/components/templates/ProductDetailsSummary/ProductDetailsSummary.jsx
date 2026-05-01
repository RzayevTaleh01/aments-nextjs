"use client";

import { useSession } from "next-auth/react";
import { cn } from "@/utils/cn";
import "./ProductDetailsSummary.module.scss";

export default function ProductDetailsSummary({ product }) {
  if (!product) return null;
  const { status } = useSession();
  const showPrice = status === "authenticated";


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
                <span className="badge rounded-pill text-bg-light border border-secondary-subtle text-secondary-emphasis me-2">Brand</span>
                <span>{brandName}</span>
              </div>
            ) : null}
            {markName ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-danger-subtle text-danger-emphasis me-2">Mark</span>
                <span>{markName}</span>
              </div>
            ) : null}
            {modelName ? (
              <div>
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">Model</span>
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
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">Code</span>
                <span>{product.code}</span>
              </div>
            ) : null}
            {product.oem_code ? (
              <div className="mt-1">
                <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary me-2">OEM</span>
                <span>{product.oem_code}</span>
              </div>
            ) : null}
          </div>
        ) : null}
        <p className={cn("product-description")}>
          {product.description || ""}
        </p>
      </div>

      {/*<div className="product-details-variable">*/}
      {/*  <h4 className="title">Available Options</h4>*/}
      {/*   <ProductColorOptions />*/}
      {/*</div>*/}
      {/*<div className="product-details-meta mb-20">*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <Link href="/compare">*/}
      {/*        <Icon name="FaRetweet" />*/}
      {/*        Compare*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  );
}
