import { ShopCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Shop Full Width",
};

export default function Page() {
  return <ShopCatalogPage title="Shop Full Width" breadcrumbLabel="Shop Full Width" withSidebar={false} defaultView="grid" />;
}

