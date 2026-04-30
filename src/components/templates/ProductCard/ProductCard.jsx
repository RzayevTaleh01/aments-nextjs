import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import "./ProductCard.module.scss";

export default function ProductCard({ product, actionsVariant = "links" }) {
  const useModalActions = actionsVariant === "modals";

  return (
    <div className="product-default-single">
      <div className="product-img-warp">
        <Link href={product.href}>
          <Image src={product.imageSrc} alt={product.name} width={300} height={300} className="product-default-img" />
        </Link>
        <div className="product-action-icon-link">
          <ul>
              <li>
              {useModalActions ? (
                <button type="button" data-bs-toggle="modal" data-bs-target="#modalAddcart" aria-label="Add to cart">
                  <Icon name="FaShoppingCart" />
                </button>
              ) : (
                <Link href="/cart">
                  <Icon name="FaShoppingCart" />
                </Link>
              )}
            </li>
            <li>
              {useModalActions ? (
                <button type="button" data-bs-toggle="modal" data-bs-target="#modalQuickview" aria-label="Quick view">
                  <Icon name="FaEye" />
                </button>
              ) : (
                <Link href={product.href}>
                  <Icon name="FaEye" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="product-default-content">
        <h6 className="product-default-link">
          <Link href={product.href}>{product.name}</Link>
        </h6>
        <span className="product-default-price">
          {product.compareAt ? <del className="product-default-price-off">{product.compareAt}</del> : null} {product.price}
        </span>
      </div>
    </div>
  );
}

