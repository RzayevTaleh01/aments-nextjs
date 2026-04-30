import { ProductCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Shop Grid Sidebar Right",
};

export default function Page() {
  return (
    <ProductCatalogPage
      title="Shop Grid Sidebar Right"
      breadcrumbLabel="Shop Grid Sidebar Right"
      withSidebar
      sidebarPosition="right"
      defaultView="grid"
    />
  );
}

