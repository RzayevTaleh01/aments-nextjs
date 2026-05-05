import ProductCatalogPage from "@/components/pages/ProductCatalogPage";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ProductCatalogPage withSidebar title="Product List Catalog" sidebarPosition="left" defaultView="grid" productsApiRoute={ALL_PRODUCTS_ROUTE} searchParamKey="q" />
  );
}
