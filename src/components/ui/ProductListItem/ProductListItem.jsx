"use client";

import Link from "next/link";
import Icon from "@/components/ui/TemplateIcon";

export default function ProductListItem({ product, showPrice = true }) {
  const href = product?.href;
  const imageSrc = product?.imageSrc ?? "/assets/images/products_images/aments_products_image_1.jpg";
  const title = product?.name;
  const isSimilarOem = Boolean(product?.isSimilarOem);

  return (
    <div className="col-12 mb-4">
      <div className="product-list-single border-around">
        <Link href={href} className="product-list-img-link">
          <img src={imageSrc} alt="" className="img-fluid" />
        </Link>
        <div className="product-list-content">
          <h5 className="product-list-link">
            <Link href={href}>{title}</Link>
          </h5>
          {isSimilarOem ? <span className="badge text-bg-danger mb-2">Oxşar OEM</span> : null}
          {showPrice ? (
            <span className="product-list-price">
              {product?.compareAt ? <del className="product-list-price-off">{product.compareAt}</del> : null} {product?.price}
            </span>
          ) : null}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque
            necessitatibus sed, ducimus quisquam, ad asperiores
          </p>
          <div className="product-action-icon-link-list">
            <ul>
              <li>
                <Link href={`${href}#offers`} aria-label="View offers">
                  <Icon name="FaShoppingCart" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
