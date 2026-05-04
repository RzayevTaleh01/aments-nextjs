"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products as allProducts } from "@/constants/products";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import ProductCatalogSidebar from "@/components/templates/ProductCatalogSidebar";
import ApiService from "@/services/api/ApiService";

function toAssetUrl(src) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_REQUEST_BACKEND_LOCAL_URL;
  if (base && src.startsWith("/")) return `${base}${src}`;
  return src;
}

function mapApiProductToUiProduct(p) {
  const slug = p?.slug;
  const firstStorageProduct = Array.isArray(p?.storageProducts) ? (p.storageProducts.find((sp) => sp?.price != null) ?? p.storageProducts[0]) : null;
  const priceValue = firstStorageProduct?.price;
  const price = typeof priceValue === "string" || typeof priceValue === "number" ? `${priceValue} AZN` : "";
  return {
    ...p,
    imageSrc: toAssetUrl(p?.image) ?? "/assets/images/products_images/aments_products_image_1.jpg",
    href: p?.href ?? (p?.id ? `/product/${p.id}` : slug ? `/product/${slug}` : "/product/default"),
    price,
  };
}

export default function ProductCatalogPage({
  title,
  breadcrumbLabel = title,
  withSidebar = false,
  sidebarPosition = "left",
  defaultView = "list",
  products: productsProp,
  productsApiRoute,
  searchParamKey,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [apiProducts, setApiProducts] = useState(null);
  const [apiSimilarProducts, setApiSimilarProducts] = useState([]);
  const [, setApiSimilarTotal] = useState(null);
  const [apiMeta, setApiMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const urlSearchParams = useSearchParams();
  const q = searchParamKey ? urlSearchParams?.get(searchParamKey) ?? "" : "";
  const normalizedQ = useMemo(() => String(q || "").trim(), [q]);
  const pageParam = urlSearchParams?.get("page") ?? "1";
  const page = useMemo(() => {
    const n = Number(pageParam);
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.floor(n);
  }, [pageParam]);

  useEffect(() => {
    if (!productsApiRoute) return;
    let isActive = true;
    setIsLoading(true);

    (async () => {
      try {
        const params = {};
        if (normalizedQ) params.q = normalizedQ;
        if (page > 1) params.page = page;
        const res = await ApiService.get(productsApiRoute, Object.keys(params).length ? { params } : undefined);
        const data = res?.data?.data ?? {};

        const products = Array.isArray(data?.products) ? data.products : [];
        const mapped = products.map(mapApiProductToUiProduct);

        const rawSimilar = data?.similar_praducts ?? data?.similar_products;
        let similarList = [];
        let similarTotal = null;
        if (Array.isArray(rawSimilar)) {
          if (Array.isArray(rawSimilar[0])) {
            similarList = rawSimilar[0];
            similarTotal = typeof rawSimilar[1] === "number" ? rawSimilar[1] : null;
          } else if (rawSimilar.length > 0 && typeof rawSimilar[0] === "object") {
            similarList = rawSimilar;
          }
        }
        const mappedSimilar = Array.isArray(similarList) ? similarList.map(mapApiProductToUiProduct) : [];
        const meta = data?.meta ?? null;

        if (!isActive) return;
        setApiProducts(mapped);
        setApiSimilarProducts(mappedSimilar);
        setApiSimilarTotal(similarTotal);
        setApiMeta(meta);
      } catch {
        if (!isActive) return;
        setApiProducts([]);
        setApiSimilarProducts([]);
        setApiSimilarTotal(null);
        setApiMeta(null);
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [productsApiRoute, normalizedQ, page]);

  const products = useMemo(() => {
    if (Array.isArray(productsProp)) return productsProp;
    if (productsApiRoute) return Array.isArray(apiProducts) ? apiProducts : [];
    return allProducts.slice(0, 8);
  }, [apiProducts, productsApiRoute, productsProp]);

  const showSearchInfo = Boolean(searchParamKey && normalizedQ);

  const hasExactProducts = products.length > 0;
  const hasSimilar = apiSimilarProducts.length > 0;
  const isShowingSimilarAsFallback = showSearchInfo && !hasExactProducts && hasSimilar;

  const displayProducts = useMemo(() => {
    if (isShowingSimilarAsFallback) return apiSimilarProducts.map((p) => ({ ...p, isSimilarOem: true }));
    return products;
  }, [apiSimilarProducts, isShowingSimilarAsFallback, products]);

  const pagination = useMemo(() => {
    const totalPages = Number(apiMeta?.totalPages ?? 1);
    const safeTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
    return {
      page: Number(apiMeta?.page ?? page) || 1,
      totalPages: safeTotalPages,
    };
  }, [apiMeta, page]);
  
  return (
    <div>
      <Breadcrumb
        title={title}
        items={[
          { label: "Home", href: "/" },
          { label: "Product List", href: "/products" },
          { label: breadcrumbLabel },
        ]}
      />
      {showSearchInfo ? (
        <div className="container mb-5">
          <div className="alert alert-light border d-flex align-items-center justify-content-between mb-0">
            <div>
              <span className="fw-bold">OEM:</span> {normalizedQ}
            </div>
            {isLoading ? <span className="text-muted">Yüklənir...</span> : null}
          </div>
          {isShowingSimilarAsFallback && !isLoading ? (
            <div className="alert alert-light border border-top-0 rounded-top-0 mt-2">
              Uyğun məhsul tapılmadı, oxşar OEM nəticələri göstərilir.
            </div>
          ) : null}
        </div>
      ) : null}
      <ProductCatalogList
        products={displayProducts}
        withSidebar={withSidebar}
        sidebarPosition={sidebarPosition}
        defaultView={defaultView}
        showPagination={!isShowingSimilarAsFallback}
        emptyMessage={showSearchInfo ? "Məhsul tapılmadı" : undefined}
        pagination={pagination}
        onPageChange={(nextPage) => {
          const n = Number(nextPage);
          if (!Number.isFinite(n) || n < 1) return;

          const sp = new URLSearchParams(urlSearchParams?.toString?.() ?? "");
          if (n <= 1) sp.delete("page");
          else sp.set("page", String(Math.floor(n)));
          const qs = sp.toString();
          router.push(qs ? `${pathname}?${qs}` : pathname);
        }}
        renderSidebar={
          withSidebar
            ? ({ searchInput, setSearchInput, category, setCategory, brand, setBrand, mark, setMark, model, setModel, applyFilters, resetFilters }) => (
                <ProductCatalogSidebar
                  title="Filter"
                  searchValue={searchInput}
                  onSearchChange={(e) => setSearchInput(e.target.value)}
                  categoryValue={category}
                  onCategoryChange={(e) => setCategory(e.target.value)}
                  brandValue={brand}
                  onBrandChange={(e) => setBrand(e.target.value)}
                  markValue={mark}
                  onMarkChange={(e) => setMark(e.target.value)}
                  modelValue={model}
                  onModelChange={(e) => setModel(e.target.value)}
                  onSearch={applyFilters}
                  onClear={resetFilters}
                />
              )
            : undefined
        }
      />
    </div>
  );
}
