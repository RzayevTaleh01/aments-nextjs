import { Breadcrumb } from "@/components/ui";
import { MyAccountPage } from "@/components/pages";

export const metadata = {
  title: "My Account",
};

export default function Page() {
  return (
    <div>
      <Breadcrumb
        title="My Account"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "My Account" },
        ]}
      />

      <MyAccountPage />
    </div>
  );
}
