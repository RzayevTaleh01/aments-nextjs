"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Icon } from "@/components/ui";
import styles from "./ComparePage.module.scss";

export default function ComparePage() {
  const products = [
    {
      img: "/assets/images/products_images/aments_products_image_1.jpg",
      category: "Furniture",
      title: "Rinosin title",
      price: "$295",
    },
    {
      img: "/assets/images/products_images/aments_products_image_2.jpg",
      category: "Furniture",
      title: "Macro title",
      price: "$275",
    },
    {
      img: "/assets/images/products_images/aments_products_image_3.jpg",
      category: "Furniture",
      title: "Oakley title",
      price: "$395",
    },
  ];

  return (
    <div className={styles.scope}>
      <Breadcrumb
        title="Compare"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "Compare" },
        ]}
      />

      <div className="compare-section">
        <div className="compare-table-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table_desc">
                  <div className="table_page table-responsive compare-table">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td className="first-column">Product</td>
                          {products.map((p) => (
                            <td key={p.title} className="product-image-title">
                              <Link href="/product/default" className="image">
                                <Image src={p.img} alt="Compare Product" width={210} height={210} />
                              </Link>
                              <Link href="/shop/grid/sidebar-left" className="category">
                                {p.category}
                              </Link>
                              <Link href="/product/default" className="title">
                                {p.title}
                              </Link>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Description</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-desc">
                              <p>Eye glasses are very important for thos whos have some difficult in their eye to see every hing clearly and perfectly</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Price</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-price">
                              {p.price}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Color</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-color">
                              Black
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Stock</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-stock">
                              In Stock
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Add to cart</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-addtocart">
                              <a href="#" className="add-to-cart" onClick={(e) => e.preventDefault()}>
                                <span>ADD TO CART</span>
                              </a>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Delete</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-remove">
                              <button type="button" aria-label="Delete" onClick={(e) => e.preventDefault()}>
                                <Icon name="FaTrashAlt" size={18} />
                              </button>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="first-column">Rating</td>
                          {products.map((p) => (
                            <td key={p.title} className="pro-ratting">
                              <div className="product-review">
                                <span className="review-fill">
                                  <Icon name="FaStar" size={14} />
                                </span>
                                <span className="review-fill">
                                  <Icon name="FaStar" size={14} />
                                </span>
                                <span className="review-fill">
                                  <Icon name="FaStar" size={14} />
                                </span>
                                <span className="review-fill">
                                  <Icon name="FaStar" size={14} />
                                </span>
                                <span className="review-empty">
                                  <Icon name="FaRegStar" size={14} />
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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
