import ProductCatalogPage from "@/components/pages/ProductCatalogPage";
import { products } from "@/constants/products";
export const metadata = {
  title: "Products",
};

export const dynamic = "force-dynamic";



export default async function Page() {
  return (<ProductCatalogPage
    withSidebar
    title="Product List Catalog"
    sidebarPosition="left"
    defaultView="grid"
    products={products}
  />);
}
