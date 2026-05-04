"use client";

import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { products as allProducts } from "@/constants/products";
import ProductCatalogList from "@/components/templates/ProductCatalogList";
import ProductCatalogSidebar from "@/components/templates/ProductCatalogSidebar/ProductCatalogSidebar";

export default function ProductCatalogPage({
  title,
  breadcrumbLabel,
  withSidebar = false,
  sidebarPosition = "left",
  defaultView = "list",
}) {
  const products = allProducts.slice(0, 8);

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
