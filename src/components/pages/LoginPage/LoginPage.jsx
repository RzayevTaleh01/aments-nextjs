"use client";

import { Breadcrumb } from "@/components/ui";
import { LoginTemplate } from "@/components/templates";

export default function LoginPage() {
  return (
    <div>
      <Breadcrumb
        title="Login"
        items={[
          { label: "Home", href: "/" },
          { label: "Login" },
        ]}
      />
      <LoginTemplate />
    </div>
  );
}
