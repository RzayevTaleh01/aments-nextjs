import { BlogListPage } from "@/components/pages";

export const metadata = {
  title: "Blog Grid Sidebar Left",
};

export default function Page() {
  return (
    <BlogListPage
      title="Blog Grid Sidebar Left"
      breadcrumbLabel="Blog Grid Sidebar Left"
      withSidebar
      sidebarPosition="left"
      columns={2}
    />
  );
}

