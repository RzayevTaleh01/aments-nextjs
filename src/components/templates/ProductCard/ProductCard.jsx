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
              <Link href="/wishlist">
                <Icon name="FaHeart" />
              </Link>
            </li>
            <li>
              <Link href="/compare">
                <Icon name="FaRetweet" />
              </Link>
            </li>
            <li>
              {useModalActions ? (
                <a href="#modalQuickview" data-bs-toggle="modal" data-bs-target="#modalQuickview">
                  <Icon name="FaEye" />
                </a>
              ) : (
                <Link href={product.href}>
                  <Icon name="FaEye" />
                </Link>
              )}
            </li>
            <li>
              {useModalActions ? (
                <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart">
                  <Icon name="FaShoppingCart" />
                </a>
              ) : (
                <Link href="/cart">
                  <Icon name="FaShoppingCart" />
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

