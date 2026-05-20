"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";
import useShowPrice from "@/hooks/use-show-price";
import styles from "./CartPage.module.scss";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import { toast } from "react-toastify";

function parsePriceNumber(priceText) {
  if (typeof priceText === "number" && Number.isFinite(priceText)) return priceText;
  if (typeof priceText !== "string") return null;
  const normalized = priceText.replace(",", ".").replace(/[^\d.]/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatMoney(value, currency) {
  const n = typeof value === "number" ? value : parsePriceNumber(value);
  if (!Number.isFinite(n)) return currency ? `0.00 ${currency}` : "0.00";
  const text = n.toFixed(2);
  return currency ? `${text} ${currency}` : text;
}

export default function CartPage() {
  const router = useRouter();
  const { showPrice } = useShowPrice();
  const { cartItems, isCartReady, cartSubtotalText, setCartItemQuantity, removeCartItem } = useCart();
  const { staticContent } = useInitial();
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL || "";
  const redirectToastShownRef = useRef(false);

  const shouldRedirect = isCartReady && cartItems.length === 0;
  useEffect(() => {
    if (!shouldRedirect) return;
    if (!redirectToastShownRef.current) {
      redirectToastShownRef.current = true;
      toast.info(
        HelperTranslate({
          defaultText: "Cart is empty",
          translateText: staticContent?.cart__empty,
        })
      );
    }
    router.replace("/products");
  }, [router, shouldRedirect, staticContent]);

  if (shouldRedirect) return null;

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Cart"
        titleKey="cart__breadcrumbTitle"
        items={[
          { label: "Home", labelKey: "breadcrumb__home", href: "/" },
          { label: "Cart" },
        ]}
      />

      <div className="cart-section">
        <div className="cart-table-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table_desc">
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product_remove">
                            {HelperTranslate({ defaultText: "Delete", translateText: staticContent?.cart__delete })}
                          </th>
                          <th className="product_thumb">
                            {HelperTranslate({ defaultText: "Image", translateText: staticContent?.cart__image })}
                          </th>
                          <th className="product_name">
                            {HelperTranslate({ defaultText: "Product", translateText: staticContent?.cart__product })}
                          </th>
                          <th className="product-price">
                            {HelperTranslate({ defaultText: "Price", translateText: staticContent?.cart__price })}
                          </th>
                          <th className="product_quantity">
                            {HelperTranslate({ defaultText: "Quantity", translateText: staticContent?.offerModal__qtyLabel })}
                          </th>
                          <th className="product_total">
                            {HelperTranslate({ defaultText: "Total", translateText: staticContent?.cart__total })}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((row) => (
                          (() => {
                            const unit = parsePriceNumber(row.unitPrice) ?? parsePriceNumber(row.unitPriceText) ?? 0;
                            const qty = Number(row.quantity ?? 1);
                            const total = unit * (Number.isFinite(qty) ? qty : 1);
                            const totalText = formatMoney(total, row.currency ?? "");
                            const rawImageSrc = row.imageSrc || row.image || "/assets/images/products_images/aments_products_image_1.jpg";
                            const normalizedImageSrc = String(rawImageSrc || "").startsWith("uploads/") ? `/${rawImageSrc}` : rawImageSrc;
                            const imageSrc = String(normalizedImageSrc || "").startsWith("/uploads") ? `${base}${normalizedImageSrc}` : normalizedImageSrc;

                            return (
                          <tr key={row.key}>
                            <td className="product_remove">
                              <button
                                type="button"
                                aria-label={HelperTranslate({ defaultText: "Delete", translateText: staticContent?.cart__delete })}
                                className="p-0 border-0 bg-transparent"
                                onClick={() => removeCartItem(row.key)}
                              >
                                <Icon name="FaTrashAlt" size={18} />
                              </button>
                            </td>
                            <td className="product_thumb">
                              <Link href={row.href || "/product/default"}>
                                <Image src={imageSrc} alt={row.name || ""} width={120} height={120} />
                              </Link>
                            </td>
                            <td className="product_name">
                              <Link href={row.href || "/product/default"}>{row.name}</Link>
                            </td>
                            <td className="product-price">{showPrice ? row.unitPriceText || row.unitPrice : null}</td>
                            <td className="product_quantity">
                              <label>
                                {HelperTranslate({ defaultText: "Quantity", translateText: staticContent?.offerModal__qtyLabel })}
                              </label>{" "}
                              <input
                                min="1"
                                value={String(row.quantity ?? 1)}
                                type="number"
                                onChange={(e) => setCartItemQuantity(row.key, e.target.value)}
                              />
                            </td>
                            <td className="product_total">{showPrice ? totalText : null}</td>
                          </tr>
                            );
                          })()
                        ))}
                        {cartItems.length === 0 ? (
                          <tr>
                            <td colSpan={6}>
                              {HelperTranslate({ defaultText: "Cart is empty", translateText: staticContent?.cart__empty })}
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart_submit">
                    <button type="button">
                      {HelperTranslate({ defaultText: "update cart", translateText: staticContent?.cart__update })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="coupon_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="coupon_code right">
                  <h3>{HelperTranslate({ defaultText: "Cart Totals", translateText: staticContent?.cart__totals })}</h3>
                  <div className="coupon_inner">
                    <div className="cart_subtotal">
                      <p>{HelperTranslate({ defaultText: "Subtotal", translateText: staticContent?.cart__subtotal })}</p>
                      <p className="cart_amount">{showPrice ? cartSubtotalText : null}</p>
                    </div>
                    {/*<div className="cart_subtotal ">*/}
                    {/*  <p>Shipping</p>*/}
                    {/*  <p className="cart_amount">*/}
                    {/*    <span>Flat Rate:</span> $255.00*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                    {/*<button type="button" className="btn btn-link p-0">*/}
                    {/*  Calculate shipping*/}
                    {/*</button>*/}
                    <div className="cart_subtotal">
                      <p>{HelperTranslate({ defaultText: "Total", translateText: staticContent?.cart__total })}</p>
                      <p className="cart_amount">{showPrice ? cartSubtotalText : null}</p>
                    </div>
                    <div className="checkout_btn">
                      <Link href="/checkout">
                        {HelperTranslate({ defaultText: "Proceed to Checkout", translateText: staticContent?.cart__proceedToCheckout })}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
