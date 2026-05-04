"use client";

import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products as allProducts } from "@/constants/products";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import ProductCatalogSidebar from "@/components/templates/ProductCatalogSidebar";
import ApiService from "@/services/api/ApiService";

function mapApiProductToUiProduct(p) {
  const slug = p?.slug;
  return {
    ...p,
    imageSrc:"/assets/images/products_images/aments_products_image_1.jpg",
    href: p?.href ?? (slug ? `/product/${p.id}` : ""),
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
}) {
  const [apiProducts, setApiProducts] = useState(null);

  useEffect(() => {
    if (!productsApiRoute) return;
    let isActive = true;

    (async () => {
      try {
        const res = await ApiService.get(productsApiRoute);
        const products = res?.data?.data?.products;
        const mapped = Array.isArray(products) ? products.map(mapApiProductToUiProduct) : [];
        if (!isActive) return;
        setApiProducts(mapped);
      } catch {
        if (!isActive) return;
        setApiProducts([]);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [productsApiRoute]);

  const products = useMemo(() => {
    if (Array.isArray(productsProp)) return productsProp;
    if (productsApiRoute) return Array.isArray(apiProducts) ? apiProducts : [];
    return allProducts.slice(0, 8);
  }, [apiProducts, productsApiRoute, productsProp]);
  
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
      <ProductCatalogList
        products={products}
        withSidebar={withSidebar}
        sidebarPosition={sidebarPosition}
        defaultView={defaultView}
        renderSidebar={({
          searchInput,
          setSearchInput,
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
        }) => (
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
        )}
      />
    </div>
  );
}
