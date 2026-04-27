import { ShopCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Shop Grid Sidebar Left",
};

export default function Page() {
  return (
    <ShopCatalogPage
      title="Shop Grid Sidebar Left"
      breadcrumbLabel="Shop Grid Sidebar Left"
      withSidebar
      sidebarPosition="left"
      defaultView="grid"
    />
  );
}

