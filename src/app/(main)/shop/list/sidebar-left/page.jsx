import { ProductCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Shop List Sidebar Left",
};

export default function Page() {
  return (
    <ProductCatalogPage
      title="Shop List Sidebar Left"
      breadcrumbLabel="Shop List Sidebar Left"
      withSidebar
      sidebarPosition="left"
      defaultView="list"
    />
  );
}

