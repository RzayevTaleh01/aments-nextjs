"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/TemplateIcon";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import "./ProductCard.module.scss";

export default function ProductCard({ product, showPrice = true, showCartIcon = true }) {
  const { staticContent } = useInitial();
  const detailsHref = product?.href ?? (product?.slug ? `/product/${product.slug}` : "/product/default");
  const offersHref = `${detailsHref}#offers`;
  const brandName = product?.brand?.name ?? product?.brand ?? "";
  const markName = product?.mark?.name ?? product?.mark ?? "";
  const modelName = product?.model?.name ?? product?.model ?? "";
  const isSimilarOem = Boolean(product?.isSimilarOem);
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";
  const rawImageSrc = product?.imageSrc ?? product?.image ?? "/assets/images/products_images/aments_products_image_1.jpg";
  const resolvedSrc = String(rawImageSrc || "").startsWith("/uploads") ? `${base}${rawImageSrc}` : rawImageSrc;

  return (
    <div className="product-default-single">
      <div className="product-img-warp position-relative">
        <Link href={detailsHref}>
          <Image
            src={resolvedSrc}
            alt={HelperTranslate({ defaultText: product?.name || "Product", translateText: product?.name || staticContent?.common__productAlt })}
            width={300}
            height={300}
            className="product-default-img"
          />
        </Link>
        {isSimilarOem ? (
          <span className="badge text-bg-danger position-absolute top-0 start-0 m-2">
            {HelperTranslate({ defaultText: "Oxşar OEM", translateText: staticContent?.product__similarBadge })}
          </span>
        ) : null}
        {showCartIcon ? (
          <div className="product-action-icon-link">
            <ul>
              <li>
                <Link
                  href={offersHref}
                  aria-label={HelperTranslate({ defaultText: "View offers", translateText: staticContent?.product__viewOffersAria })}
                >
                  <Icon name="FaShoppingCart" />
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="product-default-content">
        <h6 className="product-default-link">
          <Link href={detailsHref}>{product.name}</Link>
        </h6>
        {brandName || markName || modelName ? (
          <div className="d-flex flex-wrap gap-1 mb-5">
            {brandName ? (
              <span className="badge rounded-pill text-bg-light border border-secondary-subtle text-secondary-emphasis">{brandName}</span>
            ) : null}
            {markName ? <span className="badge rounded-pill text-bg-light border border-danger-subtle text-danger-emphasis">{markName}</span> : null}
            {modelName ? <span className="badge rounded-pill text-bg-light border border-dark-subtle text-body-secondary">{modelName}</span> : null}
          </div>
        ) : null}
        {showPrice && (product?.price != null || product?.compareAt != null) ? (
          <span className="product-default-price">
            {product.compareAt ? <del className="product-default-price-off">{product.compareAt}</del> : null} {product.price}
          </span>
        ) : null}
      </div>
    </div>
  );
}

