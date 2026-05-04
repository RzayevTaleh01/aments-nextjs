import ProductCatalogPage from "@/components/pages/ProductCatalogPage/ProductCatalogPage";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ProductCatalogPage
      title="Product List Catalog"
      breadcrumbLabel="Product List Catalog"
      withSidebar
      sidebarPosition="left"
      defaultView="grid"
    />
  );
}
