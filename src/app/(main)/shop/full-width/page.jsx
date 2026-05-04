import ProductCatalogPage from "@/components/pages/ProductCatalogPage/ProductCatalogPage";

export const metadata = {
  title: "Shop Full Width",
};

export default function Page() {
  return <ProductCatalogPage title="Shop Full Width" breadcrumbLabel="Shop Full Width" withSidebar={false} defaultView="grid" />;
}

