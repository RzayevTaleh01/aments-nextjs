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
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { pickText } from "@/admin/utils/text";

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
        toast.success("Uğurla silindi");
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
                      <SgButton size="sm" color="error-outline" icon={FaTrash} onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
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
            size="sm"
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
