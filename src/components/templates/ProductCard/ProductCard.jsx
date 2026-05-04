import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import "./ProductCard.module.scss";

export default function ProductCard({ product, actionsVariant = "links", showPrice = true }) {
  const useModalActions = actionsVariant === "modals";
  const detailsHref = product?.href ?? (product?.slug ? `/product/${product.slug}` : "/product/default");
  const offersHref = `${detailsHref}#offers`;
  const brandName = product?.brand?.name ?? product?.brand ?? "";
  const markName = product?.mark?.name ?? product?.mark ?? "";
  const modelName = product?.model?.name ?? product?.model ?? "";

  return (
    <div className="product-default-single">
      <div className="product-img-warp">
        <Link href={detailsHref}>
          <Image src={product.imageSrc} alt={product.name} width={300} height={300} className="product-default-img" />
        </Link>
        <div className="product-action-icon-link">
          <ul>
            <li>
              <Link href={offersHref} aria-label="View offers">
                <Icon name="FaShoppingCart" />
              </Link>
            </li>
            <li>
              {useModalActions ? (
                <button
                  type="button"
                  aria-label="Quick view"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("aments:quickview-modal", { detail: { product } }));
                  }}
                >
                  <Icon name="FaEye" />
                </button>
              ) : (
                <Link href={detailsHref}>
                  <Icon name="FaEye" />
                </Link>
              )}
            </li>
          </ul>
        </div>
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

