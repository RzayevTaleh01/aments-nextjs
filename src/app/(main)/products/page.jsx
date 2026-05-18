import ProductCatalogPage from "@/components/pages/ProductCatalogPage";
export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ProductCatalogPage withSidebar title="Product List" sidebarPosition="left" defaultView="grid" searchParamKey="q" />
  );
}
