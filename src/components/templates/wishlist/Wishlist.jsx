"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";

export default function Wishlist({ items }) {
  return (
    <div className="wishlist-section">
      <div className="wishlish-table-wrapper">
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
                        <th className="product_stock">Stock Status</th>
                        <th className="product_addcart">Add To Cart</th>
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
                            <Link href={row.href || "/product/default"}>
                              <Image src={row.img} alt={row.name} width={120} height={120} />
                            </Link>
                          </td>
                          <td className="product_name">
                            <Link href={row.href || "/product/default"}>{row.name}</Link>
                          </td>
                          <td className="product-price">{row.price}</td>
                          <td className="product_stock">{row.stockLabel || "In Stock"}</td>
                          <td className="product_addcart">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Add To Cart
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

