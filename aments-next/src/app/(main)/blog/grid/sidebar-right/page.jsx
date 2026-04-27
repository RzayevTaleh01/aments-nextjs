import { BlogListPage } from "@/components/pages";

export const metadata = {
  title: "Blog Grid Sidebar Right",
};

export default function Page() {
  return (
    <BlogListPage
      title="Blog Grid Sidebar Right"
      breadcrumbLabel="Blog Grid Sidebar Right"
      withSidebar
      sidebarPosition="right"
      columns={2}
    />
  );
}

