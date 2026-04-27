import { BlogListPage } from "@/components/pages";

export const metadata = {
  title: "Blog Full Width",
};

export default function Page() {
  return <BlogListPage title="Blog Full Width" breadcrumbLabel="Blog Full Width" withSidebar={false} columns={3} />;
}

