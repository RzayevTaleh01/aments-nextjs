import { ShopCatalogPage } from "@/components/pages";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ShopCatalogPage
      title="Shop List Sidebar Left"
      breadcrumbLabel="Shop List Sidebar Left"
      withSidebar
      sidebarPosition="left"
      defaultView="list"
    />
  );
}

