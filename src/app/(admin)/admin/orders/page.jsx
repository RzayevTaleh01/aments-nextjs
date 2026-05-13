"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_ORDER_BY_ID_ROUTE, GET_ORDERS_ROUTE } from "@/admin/configs/apiRoutes";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { SgPopup } from "@/admin/components/ui/Popup";
import { useState } from "react";
import { SgButton } from "@/admin/components/ui/Button";

function toText(value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.length ? toText(value[0]) : "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    const translations = Array.isArray(value?.translations) ? value.translations : null;
    if (translations?.length) {
      const candidate = translations.find((t) => t?.name || t?.title || t?.label) || translations[0];
      const t = toText(candidate);
      if (t.trim() !== "") return t;
    }

    const v = value?.name ?? value?.title ?? value?.label ?? value?.slug ?? value?.code ?? value?.id;
    return v === undefined || v === null ? "" : String(v);
  }
  return String(value);
}

function pickText(row, keys) {
  for (const key of keys) {
    const raw = row?.[key];
    const value = toText(raw);
    if (value.trim() !== "") return value;
  }
  return "-";
}

export default function Page() {
  const [reloadKey, setReloadKey] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  function openDeleteModal(row) {
    setSelectedRow(row || null);
    setConfirmOpen(true);
  }

  function handleDeleteConfirmed() {
    const id = selectedRow?.id;
    if (!id) {
      setConfirmOpen(false);
      setSelectedRow(null);
      return;
    }
    ApiService.delete(`${DELETE_ORDER_BY_ID_ROUTE}/${id}`)
      .then(() => {
        setConfirmOpen(false);
        setSelectedRow(null);
        setReloadKey((v) => v + 1);
      })
      .catch(() => {});
  }

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Sifarişlər" description="Sifarişlərin siyahısı." filter={true} />
        <SgPageBody>
          <SgTable
            data_key="data"
            reloadKey={reloadKey}
            tableData={{
              data: [
                {
                  key: "id",
                  name: "ID",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["id"])}</>,
                },
                {
                  key: "storage_product_id",
                  name: "Storage product ID",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["storage_product_id", "storageProductId", "storage_productId"])}</>,
                },
                {
                  key: "quantity",
                  name: "Sayı",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["quantity", "qty"])}</>,
                },
                {
                  key: "total_price",
                  name: "Total qiymət",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["total_price", "totalPrice"])}</>,
                },
                {
                  key: "posAppId",
                  name: "POS App ID",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["posAppId"])}</>,
                },
                {
                  key: "actions",
                  name: "Actions",
                  hidden: false,
                  hoverable: false,
                  cell: (row) => (
                    <SgButtonGroup gap={true}>
                      <SgButton size="sm" color="error-outline" icon="trash" onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_ORDERS_ROUTE,
            }}
          />
          <SgPopup
            header="Sifarişi sil"
            description={`Bu sifarişi silmək istəyirsiniz? (ID: ${selectedRow?.id ?? "-"})`}
            setToggleModal={setConfirmOpen}
            toggleModal={confirmOpen}
            size="md"
          >
            <SgButtonGroup gap={true}>
              <SgButton color="error" size="sm" onClick={handleDeleteConfirmed}>
                Sil
              </SgButton>
              <SgButton color="secondary-outline" size="sm" onClick={() => setConfirmOpen(false)}>
                Ləğv et
              </SgButton>
            </SgButtonGroup>
          </SgPopup>
        </SgPageBody>
      </SgPage>
    </MainLayout>
  );
}
