"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import Icon from "@/components/ui/TemplateIcon/TemplateIcon";
import { useCart } from "@/context/ui-drawers-context";
import styles from "./CartPage.module.scss";

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
  const { status } = useSession();
  const showPrice = status === "authenticated";
  const { cartItems, cartSubtotalText, setCartItemQuantity, removeCartItem } = useCart();

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Cart"
        items={[
          { label: "Home", href: "/" },
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
                          <th className="product_remove">Delete</th>
                          <th className="product_thumb">Image</th>
                          <th className="product_name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product_quantity">Quantity</th>
                          <th className="product_total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((row) => (
                          (() => {
                            const unit = parsePriceNumber(row.unitPrice) ?? parsePriceNumber(row.unitPriceText) ?? 0;
                            const qty = Number(row.quantity ?? 1);
                            const total = unit * (Number.isFinite(qty) ? qty : 1);
                            const totalText = formatMoney(total, row.currency ?? "");

                            return (
                          <tr key={row.key}>
                            <td className="product_remove">
                              <button
                                type="button"
                                aria-label="Delete"
                                className="p-0 border-0 bg-transparent"
                                onClick={() => removeCartItem(row.key)}
                              >
                                <Icon name="FaTrashAlt" size={18} />
                              </button>
                            </td>
                            <td className="product_thumb">
                              <Link href={row.href || "/product/default"}>
                                <Image src={row.imageSrc || "/assets/images/products_images/aments_products_image_1.jpg"} alt={row.name || ""} width={120} height={120} />
                              </Link>
                            </td>
                            <td className="product_name">
                              <Link href={row.href || "/product/default"}>{row.name}</Link>
                            </td>
                            <td className="product-price">{showPrice ? row.unitPriceText || row.unitPrice : null}</td>
                            <td className="product_quantity">
                              <label>Quantity</label>{" "}
                              <input
                                min="1"
                                max="100"
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
                            <td colSpan={6}>Cart is empty</td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart_submit">
                    <button type="button">update cart</button>
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
                  <h3>Cart Totals</h3>
                  <div className="coupon_inner">
                    <div className="cart_subtotal">
                      <p>Subtotal</p>
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
                      <p>Total</p>
                      <p className="cart_amount">{showPrice ? cartSubtotalText : null}</p>
                    </div>
                    <div className="checkout_btn">
                      <Link href="/checkout">Proceed to Checkout</Link>
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
