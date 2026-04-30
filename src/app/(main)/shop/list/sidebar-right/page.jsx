import { ProductCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Shop List Sidebar Right",
};

export default function Page() {
  return (
    <ProductCatalogPage
      title="Shop List Sidebar Right"
      breadcrumbLabel="Shop List Sidebar Right"
      withSidebar
      sidebarPosition="right"
      defaultView="list"
    />
  );
}

