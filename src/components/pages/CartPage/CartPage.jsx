"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Icon } from "@/components/ui";
import styles from "./CartPage.module.scss";

export default function CartPage() {
  const items = [
    { img: "/assets/images/products_images/aments_products_image_1.jpg", name: "Handbag fringilla", price: "$65.00", qty: 1, total: "$130.00" },
    { img: "/assets/images/products_images/aments_products_image_2.jpg", name: "Handbags justo", price: "$90.00", qty: 1, total: "$180.00" },
    { img: "/assets/images/products_images/aments_products_image_3.jpg", name: "Handbag elit", price: "$80.00", qty: 1, total: "$160.00" },
  ];

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Cart"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
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
                        {items.map((row) => (
                          <tr key={row.name}>
                            <td className="product_remove">
                              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Delete">
                                <Icon name="FaTrashAlt" size={18} />
                              </a>
                            </td>
                            <td className="product_thumb">
                              <Link href="/product/default">
                                <Image src={row.img} alt={row.name} width={120} height={120} />
                              </Link>
                            </td>
                            <td className="product_name">
                              <Link href="/product/default">{row.name}</Link>
                            </td>
                            <td className="product-price">{row.price}</td>
                            <td className="product_quantity">
                              <label>Quantity</label>{" "}
                              <input min="1" max="100" defaultValue={String(row.qty)} type="number" />
                            </td>
                            <td className="product_total">{row.total}</td>
                          </tr>
                        ))}
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
              <div className="col-lg-6 col-md-6">
                <div className="coupon_code left">
                  <h3>Coupon</h3>
                  <div className="coupon_inner">
                    <p>Enter your coupon code if you have one.</p>
                    <input placeholder="Coupon code" type="text" />
                    <button type="button">Apply coupon</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="coupon_code right">
                  <h3>Cart Totals</h3>
                  <div className="coupon_inner">
                    <div className="cart_subtotal">
                      <p>Subtotal</p>
                      <p className="cart_amount">$215.00</p>
                    </div>
                    <div className="cart_subtotal ">
                      <p>Shipping</p>
                      <p className="cart_amount">
                        <span>Flat Rate:</span> $255.00
                      </p>
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Calculate shipping
                    </a>
                    <div className="cart_subtotal">
                      <p>Total</p>
                      <p className="cart_amount">$215.00</p>
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
