"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products as allProducts } from "@/constants/products";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import ProductCatalogSidebar from "@/components/templates/ProductCatalogSidebar";
import { BRANDS_ROUTE, CATEGORIES_ROUTE, MARKS_ROUTE, MODELS_BY_MARK_ROUTE } from "@/configs/apiRoutes";
import ApiService from "@/services/api/ApiService";
import useInitial from "@/hooks/use-initial";
import HelperTranslate from "@/components/helper/HelperTranslate";
import UiLoader from "@/components/ui/Loader/Loader";

function pickFirstString(values) {
  for (const v of values) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function extractApiImage(product) {
  if (!product || typeof product !== "object") return "";

  const direct = pickFirstString([product.image, product.thumbnail, product.photo, product.img, product.imageUrl, product.image_url]);
  if (direct) return direct;

  const directObj = [product.image, product.thumbnail, product.photo, product.img, product.imageUrl, product.image_url].find((v) => v && typeof v === "object");
  if (directObj && typeof directObj === "object") {
    const nested = pickFirstString([directObj.url, directObj.image, directObj.path, directObj.src, directObj.file]);
    if (nested) return nested;
  }

  const images = product.images;
  if (typeof images === "string" && images.trim()) return images.trim();
  if (Array.isArray(images)) {
    const first = images.find((x) => x != null);
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first === "object") {
      const nested = pickFirstString([first.image, first.url, first.path, first.src, first.file]);
      if (nested) return nested;
    }
  }

  return "";
}

function mapApiProductToUiProduct(p) {
  const slug = p?.slug;
  const firstStorageProduct = Array.isArray(p?.storageProducts) ? (p.storageProducts.find((sp) => sp?.price != null) ?? p.storageProducts[0]) : null;
  const priceValue = firstStorageProduct?.price;
  const price = typeof priceValue === "string" || typeof priceValue === "number" ? `${priceValue} AZN` : "";
  const apiImage = extractApiImage(p);
  return {
    ...p,
    imageSrc: apiImage,
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
  const { staticContent } = useInitial();
  const [apiProducts, setApiProducts] = useState(null);
  const [apiSimilarProducts, setApiSimilarProducts] = useState([]);
  const [, setApiSimilarTotal] = useState(null);
  const [apiMeta, setApiMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([{ label: "Kateqoriya", value: "" }]);
  const [brandOptions, setBrandOptions] = useState([{ label: "Brend", value: "" }]);
  const [markOptions, setMarkOptions] = useState([{ label: "Marka", value: "" }]);
  const [modelOptions, setModelOptions] = useState([{ label: "Model", value: "" }]);

  const urlSearchParams = useSearchParams();
  const q = searchParamKey ? urlSearchParams?.get(searchParamKey) ?? "" : "";
  const normalizedQ = useMemo(() => String(q || "").trim(), [q]);
  const pageParam = urlSearchParams?.get("page") ?? "1";
  const categoryId = urlSearchParams?.get("categoryId") ?? "";
  const brandId = urlSearchParams?.get("brandId") ?? "";
  const markId = urlSearchParams?.get("markId") ?? "";
  const modelId = urlSearchParams?.get("modelId") ?? "";
  const page = useMemo(() => {
    const n = Number(pageParam);
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.floor(n);
  }, [pageParam]);

  useEffect(() => {
    let isActive = true;

    function extractArray(payload, preferredKeys = []) {
      if (Array.isArray(payload)) return payload;
      if (!payload || typeof payload !== "object") return [];
      if (Array.isArray(payload.data)) return payload.data;

      for (const k of preferredKeys) {
        if (Array.isArray(payload[k])) return payload[k];
      }

      const nested = payload.data;
      if (nested && typeof nested === "object") {
        for (const k of preferredKeys) {
          if (Array.isArray(nested[k])) return nested[k];
        }
      }

      return [];
    }

    function toOptions(items, placeholderLabel) {
      const base = [{ label: placeholderLabel, value: "" }];
      const mapped = (items || [])
        .filter((x) => x?.id != null && (x?.name != null || x?.title != null))
        .map((x) => ({ label: x?.name ?? x?.title, value: String(x.id) }));
      return base.concat(mapped);
    }

    (async () => {
      try {
        const [catRes, brandRes, markRes] = await Promise.allSettled([
          ApiService.get(CATEGORIES_ROUTE),
          ApiService.get(BRANDS_ROUTE),
          ApiService.get(MARKS_ROUTE),
        ]);

        if (!isActive) return;

        const catData = catRes.status === "fulfilled" ? catRes.value?.data : null;
        const brandData = brandRes.status === "fulfilled" ? brandRes.value?.data : null;
        const markData = markRes.status === "fulfilled" ? markRes.value?.data : null;

        const categories = extractArray(catData, ["categories", "category"]);
        const brands = extractArray(brandData, ["brands", "brand"]);
        const marks = extractArray(markData, ["marks", "mark"]);

        setCategoryOptions(
          toOptions(
            categories,
            HelperTranslate({ defaultText: "Kateqoriya", translateText: staticContent?.catalog__categoryPlaceholder })
          )
        );
        setBrandOptions(
          toOptions(brands, HelperTranslate({ defaultText: "Brend", translateText: staticContent?.catalog__brandPlaceholder }))
        );
        setMarkOptions(
          toOptions(marks, HelperTranslate({ defaultText: "Marka", translateText: staticContent?.catalog__markPlaceholder }))
        );
        setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
      } catch {
        if (!isActive) return;
        setCategoryOptions([{ label: HelperTranslate({ defaultText: "Kateqoriya", translateText: staticContent?.catalog__categoryPlaceholder }), value: "" }]);
        setBrandOptions([{ label: HelperTranslate({ defaultText: "Brend", translateText: staticContent?.catalog__brandPlaceholder }), value: "" }]);
        setMarkOptions([{ label: HelperTranslate({ defaultText: "Marka", translateText: staticContent?.catalog__markPlaceholder }), value: "" }]);
        setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  function buildModelsByMarkRoute(id) {
    return MODELS_BY_MARK_ROUTE.replace(":id", encodeURIComponent(String(id)));
  }

  async function fetchModelsForMark(nextMarkId, { signal, preferKeepExisting = false } = {}) {
    const rawMarkId = String(nextMarkId || "").trim();
    if (!rawMarkId) {
      setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
      return;
    }

    if (!preferKeepExisting) {
      setModelOptions([{ label: HelperTranslate({ defaultText: "Yüklənir...", translateText: staticContent?.common__loading }), value: "" }]);
    }

    try {
      const res = await ApiService.get(buildModelsByMarkRoute(rawMarkId), signal ? { signal } : undefined);
      const payload = res?.data;

      const list = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
      const options = [{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }].concat(
        list
          .filter((x) => x?.id != null && (x?.name != null || x?.title != null))
          .map((x) => ({ label: x?.name ?? x?.title, value: String(x.id) })),
      );
      setModelOptions(options);
    } catch {
      setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
    }
  }

  useEffect(() => {
    const rawMarkId = String(markId || "").trim();
    if (!rawMarkId) {
      setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
      return;
    }

    const controller = new AbortController();
    fetchModelsForMark(rawMarkId, { signal: controller.signal, preferKeepExisting: true });
    return () => controller.abort();
  }, [markId]);

  useEffect(() => {
    if (!productsApiRoute) return;
    let isActive = true;
    setIsLoading(true);

    (async () => {
      try {
        const params = {};
        if (normalizedQ) params[searchParamKey || "q"] = normalizedQ;
        if (categoryId) params.categoryId = categoryId;
        if (brandId) params.brandId = brandId;
        if (markId) params.markId = markId;
        if (modelId) params.modelId = modelId;
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
  }, [productsApiRoute, normalizedQ, page, searchParamKey, categoryId, brandId, markId, modelId]);

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

  function applyUrlFilters(next) {
    const sp = new URLSearchParams(urlSearchParams?.toString?.() ?? "");
    const qKey = searchParamKey || "q";

    const nextQ = String(next?.q || "").trim();
    if (nextQ) sp.set(qKey, nextQ);
    else sp.delete(qKey);

    const nextCategoryId = String(next?.categoryId || "");
    const nextBrandId = String(next?.brandId || "");
    const nextMarkId = String(next?.markId || "");
    const nextModelId = String(next?.modelId || "");

    if (nextCategoryId) sp.set("categoryId", nextCategoryId);
    else sp.delete("categoryId");

    if (nextBrandId) sp.set("brandId", nextBrandId);
    else sp.delete("brandId");

    if (nextMarkId) sp.set("markId", nextMarkId);
    else sp.delete("markId");

    if (nextModelId) sp.set("modelId", nextModelId);
    else sp.delete("modelId");

    sp.delete("page");

    const qs = sp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function clearUrlFilters() {
    const sp = new URLSearchParams(urlSearchParams?.toString?.() ?? "");
    const qKey = searchParamKey || "q";
    sp.delete(qKey);
    sp.delete("categoryId");
    sp.delete("brandId");
    sp.delete("markId");
    sp.delete("modelId");
    sp.delete("page");
    const qs = sp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }
  
  return (
    <div>
      <UiLoader
        fullscreen={true}
        visible={isLoading}
        label={HelperTranslate({ defaultText: "Yüklənir...", translateText: staticContent?.common__loading })}
      />
      <Breadcrumb
        title={title}
        items={[
          { label: "Home", labelKey: "breadcrumb__home", href: "/" },
          { label: "Product List", labelKey: "breadcrumb__products", href: "/products" },
          { label: breadcrumbLabel },
        ]}
      />
      {showSearchInfo ? (
        <div className="container mb-5">
          <div className="alert alert-light border d-flex align-items-center justify-content-between mb-0">
            <div>
              <span className="fw-bold">
                {HelperTranslate({ defaultText: "OEM:", translateText: staticContent?.catalog__oemLabel })}
              </span>{" "}
              {normalizedQ}
            </div>
          </div>
          {isShowingSimilarAsFallback && !isLoading ? (
            <div className="alert alert-light border border-top-0 rounded-top-0 mt-2">
              {HelperTranslate({
                defaultText: "Uyğun məhsul tapılmadı, oxşar OEM nəticələri göstərilir.",
                translateText: staticContent?.catalog__similarFallbackMessage,
              })}
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
        emptyMessage={
          showSearchInfo
            ? HelperTranslate({ defaultText: "Məhsul tapılmadı", translateText: staticContent?.catalog__emptyMessage })
            : undefined
        }
        pagination={pagination}
        enableClientSearch={!productsApiRoute}
        initialSearchValue={normalizedQ}
        initialCategoryValue={categoryId}
        initialBrandValue={brandId}
        initialMarkValue={markId}
        initialModelValue={modelId}
        onApplyFilters={applyUrlFilters}
        onResetFilters={clearUrlFilters}
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
                  title={HelperTranslate({ defaultText: "Filter", translateText: staticContent?.catalog__filterTitle })}
                  searchValue={searchInput}
                  onSearchChange={(e) => setSearchInput(e.target.value)}
                  categoryValue={category}
                  onCategoryChange={(e) => setCategory(e.target.value)}
                  brandValue={brand}
                  onBrandChange={(e) => setBrand(e.target.value)}
                  markValue={mark}
                  onMarkChange={(e) => {
                    const nextMarkId = e?.target?.value ?? "";
                    setMark(nextMarkId);
                    setModel("");
                    fetchModelsForMark(nextMarkId);
                  }}
                  modelDisabled={!mark}
                  modelValue={model}
                  onModelChange={(e) => setModel(e.target.value)}
                  onSearch={applyFilters}
                  onClear={() => {
                    resetFilters();
                    setModelOptions([{ label: HelperTranslate({ defaultText: "Model", translateText: staticContent?.catalog__modelPlaceholder }), value: "" }]);
                  }}
                  categoryOptions={categoryOptions}
                  brandOptions={brandOptions}
                  markOptions={markOptions}
                  modelOptions={modelOptions}
                />
              )
            : undefined
        }
      />
    </div>
  );
}
