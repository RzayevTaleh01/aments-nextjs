"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import ProductListItem from "@/components/ui/ProductListItem/ProductListItem";
import { cn } from "@/utils/cn";
import styles from "./ProductCatalogList.module.scss";

export default function ProductCatalogList({
  products,
  withSidebar = false,
  sidebarPosition = "left",
  defaultView = "list",
  renderSidebar,
  showPagination = true,
  emptyMessage,
  pagination,
  onPageChange,
}) {
  const { status } = useSession();
  const showPrice = status === "authenticated";
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
  const hasResults = filteredProducts.length > 0;
  const listProducts = useMemo(() => {
    return filteredProducts;
  }, [filteredProducts, searchQuery]);

  const page = Number(pagination?.page ?? 1) || 1;
  const totalPages = Number(pagination?.totalPages ?? 1) || 1;
  const shouldShowPagination = Boolean(showPagination && hasResults && totalPages > 1 && typeof onPageChange === "function");

  const pageNumbers = useMemo(() => {
    if (!shouldShowPagination) return [];
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const nums = [];
    for (let i = start; i <= end; i += 1) nums.push(i);
    return nums;
  }, [page, shouldShowPagination, totalPages]);

  function applyFilters() {
    setSearchQuery(searchInput);
  }

  function resetFilters() {
    setSearchInput("");
    setSearchQuery("");
    setCategory("");
    setBrand("");
    setMark("");
    setModel("");
  }

  const sidebarApi = {
    searchInput,
    setSearchInput,
    searchQuery,
    category,
    setCategory,
    brand,
    setBrand,
    mark,
    setMark,
    model,
    setModel,
    applyFilters,
    resetFilters,
  };

  return (
    <div className={styles.scope}>
      <div className="shop-section">
        <div className="container">
          {withSidebar ? (
            <div className={rowClass}>
              <div className="col-lg-3">
                <div className="siderbar-section">
                  {renderSidebar ? (
                    renderSidebar(sidebarApi)
                  ) : (
                    <>
                      <div className={styles.sidebarSingleWidget}>
                        <h6 className={styles.sidebarTitle}>Search</h6>
                        <div className="sidebar-content">
                          <form
                            className="d-flex gap-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              applyFilters();
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
                          <Link href="/product/kapot" className={styles.sidebarBanner}>
                            <img className="img-fluid" src="/assets/images/banner_images/aments_banner_04.jpg" alt="" />
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-lg-9">
                <div className="shop-sort-section mb-4">
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
{/* 
                        <div className="sort-select-list">
                          <form action="#" onSubmit={(e) => e.preventDefault()}>
                            <fieldset>
                              <select className="form-select" name="speed" id="speed" defaultValue="Sort by newness">
                                <option>Sort by average rating</option>
                                <option>Sort by popularity</option>
                                <option>Sort by newness</option>
                                <option>Sort by price: low to high</option>
                                <option>Sort by price: high to low</option>
                                <option>Product Name: Z</option>
                              </select>
                            </fieldset>
                          </form>
                        </div> */}

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
                            <div className="row g-4">
                              {hasResults ? (
                                filteredProducts.map((p, idx) => (
                                  <div key={p.id} className="col-xl-4 col-sm-6 col-12 d-flex">
                                    <div className="w-100">
                                      <ProductCard product={p} actionsVariant="modals" showPrice={showPrice} />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-12">
                                  <div className="alert alert-light border mb-0">{emptyMessage ?? "Məhsul tapılmadı"}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className={cn(styles.tabPane, !isGridDefault && styles.tabPaneActive)} id="layout-list">
                            <div className="row">
                              {hasResults ? (
                                listProducts.map((p) => <ProductListItem key={p.id} product={p} showPrice={showPrice} />)
                              ) : (
                                <div className="col-12">
                                  <div className="alert alert-light border mb-0">{emptyMessage ?? "Məhsul tapılmadı"}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {shouldShowPagination ? (
                  <div className="page-pagination text-center">
                    <ul>
                      <li>
                        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                          Previous
                        </button>
                      </li>
                      {pageNumbers.map((n) => (
                        <li key={n}>
                          <button type="button" className={n === page ? "active" : undefined} onClick={() => onPageChange(n)}>
                            {n}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
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
                              <select className="form-select" name="speed" id="speed" defaultValue="Sort by newness">
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
                            <div className="row g-4">
                              {hasResults ? (
                                filteredProducts.map((p) => (
                                  <div key={p.id} className="col-xl-3 col-lg-4 col-sm-6 col-12 d-flex">
                                    <div data-aos="fade-up" className="w-100">
                                      <ProductCard product={p} actionsVariant="modals" showPrice={showPrice} />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-12">
                                  <div className="alert alert-light border mb-0">{emptyMessage ?? "Məhsul tapılmadı"}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className={cn(styles.tabPane, !isGridDefault && styles.tabPaneActive)} id="layout-list">
                            <div className="row">
                              {hasResults ? (
                                listProducts.map((p) => <ProductListItem key={p.id} product={p} showPrice={showPrice} />)
                              ) : (
                                <div className="col-12">
                                  <div className="alert alert-light border mb-0">{emptyMessage ?? "Məhsul tapılmadı"}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {shouldShowPagination ? (
                  <div className="page-pagination text-center">
                    <ul>
                      <li>
                        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                          Previous
                        </button>
                      </li>
                      {pageNumbers.map((n) => (
                        <li key={n}>
                          <button type="button" className={n === page ? "active" : undefined} onClick={() => onPageChange(n)}>
                            {n}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
