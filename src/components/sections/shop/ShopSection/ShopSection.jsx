"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/templates";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";
import styles from "./ShopSection.module.scss";

export default function ShopSection({
  products,
  withSidebar = false,
  sidebarPosition = "left",
  defaultView = "list",
}) {
  const rowClass = sidebarPosition === "right" ? "row flex-column-reverse flex-lg-row-reverse" : "row flex-column-reverse flex-lg-row";
  const [activeView, setActiveView] = useState(defaultView);
  const isGridDefault = activeView !== "list";
  const gridLayoutId = useMemo(
    () => (withSidebar ? (sidebarPosition === "right" ? "layout-3-grid" : "layout-3-grid") : "layout-4-grid"),
    [withSidebar, sidebarPosition],
  );

  return (
    <div className={styles.scope}>
      <div className="shop-section">
        <div className="container">
          {withSidebar ? (
            <div className={rowClass}>
              <div className="col-lg-3">
                <div className="siderbar-section" data-aos="fade-up" data-aos-delay="0">
                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>FILTER BY PRICE</h6>
                    <div className="sidebar-content">
                      <div id="slider-range" />
                      <div className="filter-type-price">
                        <label htmlFor="amount">Price range:</label>
                        <input type="text" id="amount" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>CATEGORIES</h6>
                    <div className="sidebar-content">
                      <div className="filter-type-select">
                        <ul>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <li key={n}>
                              <label className="checkbox-default" htmlFor={`catagory_${n}`}>
                                <input type="checkbox" id={`catagory_${n}`} />
                                <span>Catagory ({n})</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>MANUFACTURER</h6>
                    <div className="sidebar-content">
                      <div className="filter-type-select">
                        <ul>
                          {[
                            { id: "brakeParts", label: "Brake Parts(6)" },
                            { id: "accessories", label: "Accessories (10)" },
                            { id: "EngineParts", label: "Engine Parts (4)" },
                            { id: "hermes", label: "hermes (10)" },
                            { id: "tommyHilfiger", label: "Tommy Hilfiger(7)" },
                          ].map((i) => (
                            <li key={i.id}>
                              <label className="checkbox-default" htmlFor={i.id}>
                                <input type="checkbox" id={i.id} />
                                <span>{i.label}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>SELECT BY COLOR</h6>
                    <div className="sidebar-content">
                      <div className="filter-type-select">
                        <ul>
                          {[
                            { id: "black", label: "Black (6)" },
                            { id: "blue", label: "Blue (8)" },
                            { id: "brown", label: "Brown (10)" },
                            { id: "Green", label: "Green (6)" },
                            { id: "pink", label: "Pink (4)" },
                          ].map((i) => (
                            <li key={i.id}>
                              <label className="checkbox-default" htmlFor={i.id}>
                                <input type="checkbox" id={i.id} />
                                <span>{i.label}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <div className="sidebar-content">
                      <Link href="/product/default" className={styles.sidebarBanner}>
                        <img className="img-fluid" src="/assets/images/banner_images/aments_banner_04.jpg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="shop-sort-section" data-aos="fade-up" data-aos-delay="0">
                  <div className="container">
                    <div className="row">
                      <div className="sort-box d-flex justify-content-between align-items-center flex-wrap">
                        <div className="sort-tablist">
                          <ul className={cn("nav", styles.sortTabBtn)}>
                            <li className={styles.sortTabBtnItem}>
                              <button
                                type="button"
                                className={cn(styles.sortTabLink, isGridDefault && styles.sortTabLinkActive)}
                                onClick={() => setActiveView("grid")}
                              >
                                <img src="/assets/images/icon/bkg_grid.png" alt="" />
                              </button>
                            </li>
                            <li className={styles.sortTabBtnItem}>
                              <button
                                type="button"
                                className={cn(styles.sortTabLink, !isGridDefault && styles.sortTabLinkActive)}
                                onClick={() => setActiveView("list")}
                              >
                                <img src="/assets/images/icon/bkg_list.png" alt="" />
                              </button>
                            </li>
                          </ul>
                        </div>

                        <div className="sort-select-list">
                          <form action="#" onSubmit={(e) => e.preventDefault()}>
                            <fieldset>
                              <select name="speed" id="speed" defaultValue="Sort by newness">
                                <option>Sort by average rating</option>
                                <option>Sort by popularity</option>
                                <option>Sort by newness</option>
                                <option>Sort by price: low to high</option>
                                <option>Sort by price: high to low</option>
                                <option>Product Name: Z</option>
                              </select>
                            </fieldset>
                          </form>
                        </div>

                        <div className="page-amount">
                          <span>Showing 1–9 of 21 results</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sort-product-tab-wrapper">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="tab-content tab-animate-zoom">
                          <div className={cn(styles.tabPane, isGridDefault && styles.tabPaneActive)} id={gridLayoutId}>
                            <div className="row">
                              {products.map((p, idx) => (
                                <div key={p.id} className="col-xl-4 col-sm-6 col-12">
                                  <div data-aos="fade-up" data-aos-delay={String((idx % 3) * 200)}>
                                    <ProductCard product={p} actionsVariant="modals" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={cn(styles.tabPane, !isGridDefault && styles.tabPaneActive)} id="layout-list">
                            <div className="row">
                              {products.slice(0, 5).map((p) => (
                                <div key={p.id} className="col-12">
                                  <div className="product-list-single border-around">
                                    <Link href={p.href} className="product-list-img-link">
                                      <img src={p.imageSrc} alt="" className="img-fluid" />
                                    </Link>
                                    <div className="product-list-content">
                                      <h5 className="product-list-link">
                                        <Link href={p.href}>{p.name}</Link>
                                      </h5>
                                      <span className="product-list-price">
                                        {p.compareAt ? <del className="product-list-price-off">{p.compareAt}</del> : null} {p.price}
                                      </span>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non
                                        eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores
                                      </p>
                                      <div className="product-action-icon-link-list">
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
                                            <a href="#modalQuickview" data-bs-toggle="modal" data-bs-target="#modalQuickview">
                                              <Icon name="FaEye" />
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart">
                                              <Icon name="FaShoppingCart" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="page-pagination text-center" data-aos="fade-up" data-aos-delay="0">
                  <ul>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Previous
                      </a>
                    </li>
                    <li>
                      <a className="active" href="#" onClick={(e) => e.preventDefault()}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        3
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-lg-12">
                <div className="shop-sort-section" data-aos="fade-up" data-aos-delay="0">
                  <div className="container">
                    <div className="row">
                      <div className="sort-box d-flex justify-content-between align-items-center flex-wrap">
                        <div className="sort-tablist">
                          <ul className={cn("nav", styles.sortTabBtn)}>
                            <li className={styles.sortTabBtnItem}>
                              <button
                                type="button"
                                className={cn(styles.sortTabLink, isGridDefault && styles.sortTabLinkActive)}
                                onClick={() => setActiveView("grid")}
                              >
                                <img src="/assets/images/icon/bkg_grid.png" alt="" />
                              </button>
                            </li>
                            <li className={styles.sortTabBtnItem}>
                              <button
                                type="button"
                                className={cn(styles.sortTabLink, !isGridDefault && styles.sortTabLinkActive)}
                                onClick={() => setActiveView("list")}
                              >
                                <img src="/assets/images/icon/bkg_list.png" alt="" />
                              </button>
                            </li>
                          </ul>
                        </div>

                        <div className="sort-select-list">
                          <form action="#" onSubmit={(e) => e.preventDefault()}>
                            <fieldset>
                              <select name="speed" id="speed" defaultValue="Sort by newness">
                                <option>Sort by average rating</option>
                                <option>Sort by popularity</option>
                                <option>Sort by newness</option>
                                <option>Sort by price: low to high</option>
                                <option>Sort by price: high to low</option>
                                <option>Product Name: Z</option>
                              </select>
                            </fieldset>
                          </form>
                        </div>

                        <div className="page-amount">
                          <span>Showing 1–9 of 21 results</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sort-product-tab-wrapper">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="tab-content tab-animate-zoom">
                          <div className={cn(styles.tabPane, isGridDefault && styles.tabPaneActive)} id="layout-4-grid">
                            <div className="row">
                              {products.map((p) => (
                                <div key={p.id} className="col-xl-3 col-lg-4 col-sm-6 col-12">
                                  <div data-aos="fade-up">
                                    <ProductCard product={p} actionsVariant="modals" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={cn(styles.tabPane, !isGridDefault && styles.tabPaneActive)} id="layout-list">
                            <div className="row">
                              {products.slice(0, 5).map((p) => (
                                <div key={p.id} className="col-12">
                                  <div className="product-list-single border-around">
                                    <Link href={p.href} className="product-list-img-link">
                                      <img src={p.imageSrc} alt="" className="img-fluid" />
                                    </Link>
                                    <div className="product-list-content">
                                      <h5 className="product-list-link">
                                        <Link href={p.href}>{p.name}</Link>
                                      </h5>
                                      <span className="product-list-price">
                                        {p.compareAt ? <del className="product-list-price-off">{p.compareAt}</del> : null} {p.price}
                                      </span>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure incidunt. Ab consequatur temporibus non
                                        eveniet inventore doloremque necessitatibus sed, ducimus quisquam, ad asperiores
                                      </p>
                                      <div className="product-action-icon-link-list">
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
                                            <a href="#modalQuickview" data-bs-toggle="modal" data-bs-target="#modalQuickview">
                                              <Icon name="FaEye" />
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#modalAddcart" data-bs-toggle="modal" data-bs-target="#modalAddcart">
                                              <Icon name="FaShoppingCart" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="page-pagination text-center" data-aos="fade-up" data-aos-delay="0">
                  <ul>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Previous
                      </a>
                    </li>
                    <li>
                      <a className="active" href="#" onClick={(e) => e.preventDefault()}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        3
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

