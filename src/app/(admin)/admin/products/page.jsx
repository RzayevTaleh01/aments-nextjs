"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_PRODUCT_BY_ID_ROUTE, GET_PRODUCTS_ROUTE } from "@/admin/configs/apiRoutes";
import { SgButton } from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { useState } from "react";

function pick(row, keys) {
  for (const key of keys) {
    const value = row?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") return value;
  }
  return "-";
}

export default function Page() {
  const [reloadKey, setReloadKey] = useState(0);

  function handleDelete(row) {
    const id = row?.id;
    if (!id) return;
    const ok = window.confirm(`Məhsulu silmək istəyirsiniz? (ID: ${id})`);
    if (!ok) return;

    ApiService.delete(`${DELETE_PRODUCT_BY_ID_ROUTE}/${id}`)
      .then(() => {
        setReloadKey((v) => v + 1);
      })
      .catch(() => {});
  }

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Məhsullar" description="Məhsulların siyahısı." filter={true}>
          <SgButton type="link" to="/admin/products/create" color="primary" size="md" icon="plus" onlyIcon={true} minimal={true}>
            Əlavə et
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <SgTable
            data_key="products"
            reloadKey={reloadKey}
            tableData={{
              data: [
                {
                  key: "id",
                  name: "ID",
                  hidden: false,
                  cell: (_, value) => <>{value ?? "-"}</>,
                },
                {
                  key: "name",
                  name: "Məhsul",
                  hidden: false,
                  cell: (row) => <>{pick(row, ["name", "title", "product_name", "productTitle"])}</>,
                },
                {
                  key: "price",
                  name: "Qiymət",
                  hidden: false,
                  cell: (row) => <>{pick(row, ["price", "sale_price", "amount"])}</>,
                },
                {
                  key: "created_at",
                  name: "Tarix",
                  hidden: false,
                  cell: (row) => <>{pick(row, ["created_at", "createdAt", "date"])}</>,
                },
                {
                  key: "actions",
                  name: "Actions",
                  hidden: false,
                  hoverable: false,
                  cell: (row) => (
                    <SgButtonGroup gap={true}>
                      <SgButton type="link" to={`/admin/products/edit/${row?.id}`} size="sm" color="secondary-outline" icon="edit" onlyIcon={true} minimal={true} />
                      <SgButton size="sm" color="error-outline" icon="trash" onlyIcon={true} minimal={true} onClick={() => handleDelete(row)} />
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_PRODUCTS_ROUTE,
              filters: {},
            }}
          />
        </SgPageBody>
      </SgPage>
    </MainLayout>
  );
}
