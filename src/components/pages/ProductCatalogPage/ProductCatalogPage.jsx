"use client";

import { Breadcrumb } from "@/components/ui";
import { products as allProducts } from "@/constants/products";
import ShopSection from "@/components/sections/shop/ShopSection";

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
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: breadcrumbLabel },
        ]}
      />
      <ShopSection products={products} withSidebar={withSidebar} sidebarPosition={sidebarPosition} defaultView={defaultView} />
    </div>
  );
}
