"use client";

import { Breadcrumb } from "@/components/ui";
import { RegisterTemplate } from "@/components/templates";

export default function RegisterPage() {
  return (
    <div>
      <Breadcrumb
        title="Register"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "Register" },
        ]}
      />
      <RegisterTemplate />
    </div>
  );
}

