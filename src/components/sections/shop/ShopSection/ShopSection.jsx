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
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const isGridDefault = activeView !== "list";
  const gridLayoutId = useMemo(
    () => (withSidebar ? (sidebarPosition === "right" ? "layout-3-grid" : "layout-3-grid") : "layout-4-grid"),
    [withSidebar, sidebarPosition],
  );
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => (p?.name ?? "").toLowerCase().includes(query));
  }, [products, searchQuery]);
  const listProducts = useMemo(() => {
    if (searchQuery.trim()) return filteredProducts;
    return filteredProducts.slice(0, 5);
  }, [filteredProducts, searchQuery]);

  return (
    <div className={styles.scope}>
      <div className="shop-section">
        <div className="container">
          {withSidebar ? (
            <div className={rowClass}>
              <div className="col-lg-3">
                <div className="siderbar-section" data-aos="fade-up" data-aos-delay="0">
                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>Search</h6>
                    <div className="sidebar-content">
                      <form
                        className="d-flex gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSearchQuery(searchInput);
                        }}
                      >
                        <input
                          className="form-control"
                          type="text"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="Ada görə axtar"
                        />
                        <button type="submit" className="btn btn-dark">
                          Search
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>Categories</h6>
                    <div className="sidebar-content">
                      <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="" />
                      </select>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>Brend</h6>
                    <div className="sidebar-content">
                      <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="" />
                      </select>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>Mark</h6>
                    <div className="sidebar-content">
                      <select className="form-select" value={mark} onChange={(e) => setMark(e.target.value)}>
                        <option value="" />
                      </select>
                    </div>
                  </div>

                  <div className={styles.sidebarSingleWidget}>
                    <h6 className={styles.sidebarTitle}>Model</h6>
                    <div className="sidebar-content">
                      <select className="form-select" value={model} onChange={(e) => setModel(e.target.value)}>
                        <option value="" />
                      </select>
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
                          <span>Showing {filteredProducts.length} results</span>
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
                              {filteredProducts.map((p, idx) => (
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
                              {listProducts.map((p) => (
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
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#modalQuickview" aria-label="Quick view">
                                              <Icon name="FaEye" />
                                            </button>
                                          </li>
                                          <li>
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#modalAddcart" aria-label="Add to cart">
                                              <Icon name="FaShoppingCart" />
                                            </button>
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
                      <button type="button">
                        Previous
                      </button>
                    </li>
                    <li>
                      <button type="button" className="active">
                        1
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        2
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        3
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        Next
                      </button>
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
                          <span>Showing {filteredProducts.length} results</span>
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
                              {filteredProducts.map((p) => (
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
                              {listProducts.map((p) => (
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
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#modalQuickview" aria-label="Quick view">
                                              <Icon name="FaEye" />
                                            </button>
                                          </li>
                                          <li>
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#modalAddcart" aria-label="Add to cart">
                                              <Icon name="FaShoppingCart" />
                                            </button>
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
                      <button type="button">
                        Previous
                      </button>
                    </li>
                    <li>
                      <button type="button" className="active">
                        1
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        2
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        3
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        Next
                      </button>
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
