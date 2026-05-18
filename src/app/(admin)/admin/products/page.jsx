"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_PRODUCT_BY_ID_ROUTE, GET_CATEGORIES_ROUTE, GET_PRODUCTS_ROUTE } from "@/admin/configs/apiRoutes";
import { SgButton } from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { SgBadge } from "@/admin/components/ui/Badge";
import { SgPopup } from "@/admin/components/ui/Popup";
import { useState } from "react";
import { toast } from "react-toastify";
import TableFilter from "@/admin/components/ui/TableFilter/TableFilter";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { pickText } from "@/admin/utils/text";
import { CONTENT_LANGUAGE_OPTIONS, CONTENT_LANGUAGES } from "@/admin/constants/constants";

export default function Page() {
  const [reloadKey, setReloadKey] = useState(0);
  const [tableFilters, setTableFilters] = useState({});
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

    ApiService.delete(`${DELETE_PRODUCT_BY_ID_ROUTE}/${id}`)
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
        <SgPageHead header="Məhsullar" description="Məhsulların siyahısı." filter={true} >
            <SgButton type="link" to="/admin/products/create" color="primary" size="md" icon={FaPlus}>
              Əlavə et
            </SgButton>
          </SgPageHead>
        <SgPageBody>
          <TableFilter
            fields={[
              {
                key: "lang",
                kind: "select",
                width: 140,
                filterKey: "lang",
                defaultValue: CONTENT_LANGUAGES.AZ,
                selectProps: {
                  variant: "select",
                  size: "small",
                  labelHidden: true,
                  placeholder: "Dil",
                },
                options: CONTENT_LANGUAGE_OPTIONS,
              },
              {
                key: "search",
                kind: "input",
                width: 260,
                filterKey: "q",
                inputProps: {
                  size: "small",
                  labelHidden: true,
                  type: "text",
                  placeholder: "Ada görə axtar...",
                },
              },
              {
                key: "categoryId",
                kind: "select",
                width: 220,
                defaultValue: "all",
                selectProps: {
                  variant: "select",
                  size: "small",
                  labelHidden: true,
                  placeholder: "Kateqoriya",
                },
                options: {
                  type: "api",
                  api: GET_CATEGORIES_ROUTE,
                  includeAll: true,
                  allValue: "all",
                  allLabel: "Kateqoriya seç",
                },
              },
              {
                key: "status",
                kind: "select",
                width: 200,
                defaultValue: "all",
                selectProps: {
                  variant: "select",
                  size: "small",
                  labelHidden: true,
                  placeholder: "Status",
                },
                options: [
                  { id: "all", name: "Status seç" },
                  { id: "active", name: "Aktiv" },
                  { id: "passive", name: "Deaktiv" },
                ],
              },
            ]}
            onChange={(payload) => {
              setTableFilters(payload?.filters || {});
            }}
          >
          </TableFilter>
          <SgTable
            data_key="products"
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
                  key: "name",
                  name: "Məhsulun adı",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["name", "title", "product_name", "productTitle"])}</>,
                },
                {
                  key: "code",
                  name: "Kod",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["code", "product_code"])}</>,
                },
                {
                  key: "category",
                  name: "Kategoriya",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["categoryName", "category_name", "category", "categoryTitle", "category_title"])}</>,
                },
                {
                  key: "status",
                  name: "Status",
                  hidden: false,
                  cell: (row) => {
                    const raw = row?.isActivated ?? row?.is_active ?? row?.status;
                    const active = String(raw) === "1" || String(raw).toLowerCase() === "active" || raw === true;
                    return <SgBadge header={active ? "Aktiv" : "Passiv"} className={`${active ? "sg--badge--success" : "sg--badge--error"} sg--badge--sm`} />;
                  },
                },
                {
                  key: "actions",
                  name: "Actions",
                  hidden: false,
                  hoverable: false,
                  cell: (row) => (
                    <SgButtonGroup gap={true}>
                      <SgButton
                        type="link"
                        to={`/product/${row?.id}`}
                        target="_blank"
                        rel="noreferrer"
                        size="sm"
                        color="secondary-outline"
                        icon={FaEye}
                        onlyIcon={true}
                        minimal={true}
                      />
                      <SgButton type="link" to={`/admin/products/edit/${row?.id}`} size="sm" color="secondary-outline" icon={FaPen} onlyIcon={true} minimal={true} />
                      <SgButton size="sm" color="error-outline" icon={FaTrash} onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_PRODUCTS_ROUTE,
              filters: tableFilters,
            }}
          />
          <SgPopup
            header="Məhsulu sil"
            description={`Bu məhsulu silmək istəyirsiniz? (ID: ${selectedRow?.id ?? "-"})`}
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
