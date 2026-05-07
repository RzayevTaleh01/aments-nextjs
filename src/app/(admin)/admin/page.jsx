"use client";

import { MainLayout } from "@/admin/components/layouts";
import DashboardItem from "@/admin/components/ui/DashboardItem";
import { sidebarPrimaryMenu } from "@/admin/configs/sidebarMenu";
import { useSession } from "next-auth/react";

function hasPermission(permissions, permissionKey) {
  if (!permissionKey) return true;
  if (!permissions) return true;
  if (Array.isArray(permissions)) {
    if (permissions.includes(permissionKey)) return true;
    return permissions.some((p) => p?.name === permissionKey || p?.key === permissionKey || p?.permission === permissionKey);
  }
  if (typeof permissions === "object") {
    return Boolean(permissions[permissionKey]);
  }
  return false;
}

export default function Page() {
  const { data: session } = useSession();

  return (
    <MainLayout>
      <div className="row gap-y-[16px]">
        {(sidebarPrimaryMenu || [])
          .filter((el) => el.dashboard && !(el?.permission && !hasPermission(session?.permissions, el?.permission)))
          .map((item, index) => (
            <div key={index} className="col-lg-4">
              <DashboardItem
                header={item?.name}
                description={item?.description}
                path={item?.external ? item?.path : `/admin${item.path === "/" ? "" : item.path}`}
                list={(item?.children || [])
                  .filter((el) => !(el?.permission && !hasPermission(session?.permissions, el?.permission)))
                  .map((el, i) => ({
                    name: el?.name,
                    path: el?.external ? el?.path : `/admin${el.path === "/" ? "" : el.path}`,
                    key: i,
                  }))}
                length={0}
              />
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
