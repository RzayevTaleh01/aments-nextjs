"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/TemplateIcon";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";

export default function ProductListItem({ product, showPrice = true, showCartIcon = true }) {
  const { staticContent } = useInitial();
  const href = product.href;
  const imageSrc = product.imageSrc;
  const title = product.name;
  const isSimilarOem = Boolean(product.isSimilarOem);
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";
  const normalizedImageSrc = imageSrc.startsWith("uploads/") ? `/${imageSrc}` : imageSrc;
  const resolvedSrc = normalizedImageSrc.startsWith("/uploads") ? `${base}${normalizedImageSrc}` : normalizedImageSrc;

  return (
    <div className="col-12 mb-4">
      <div className="product-list-single border-around">
        <Link href={href} className="product-list-img-link">
          <Image src={resolvedSrc} alt="" width={300} height={300} className="img-fluid" />
        </Link>
        <div className="product-list-content">
          <h5 className="product-list-link">
            <Link href={href}>{title}</Link>
          </h5>
          {isSimilarOem ? (
            <span className="badge text-bg-danger mb-2">
              {HelperTranslate({ defaultText: "Oxşar OEM", translateText: staticContent?.product__similarBadge })}
            </span>
          ) : null}
          {showPrice && (product.price != null || product.compareAt != null) ? (
            <span className="product-list-price">
              {product.compareAt ? <del className="product-list-price-off">{product.compareAt}</del> : null} {product.price}
            </span>
          ) : null}
          <p>
            {HelperTranslate({
              defaultText:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores",
              translateText: staticContent?.product__listDescriptionMock,
            })}
          </p>
          {showCartIcon ? (
            <div className="product-action-icon-link-list">
              <ul>
                <li>
                  <Link
                    href={`${href}#offers`}
                    aria-label={HelperTranslate({ defaultText: "View offers", translateText: staticContent?.product__viewOffersAria })}
                  >
                    <Icon name="FaShoppingCart" />
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
