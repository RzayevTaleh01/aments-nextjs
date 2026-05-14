"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_PRODUCT_BY_ID_ROUTE, GET_PRODUCTS_ROUTE } from "@/admin/configs/apiRoutes";
import { SgButton } from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { SgInput } from "@/admin/components/ui/Form";
import { SgBadge } from "@/admin/components/ui/Badge";
import { SgPopup } from "@/admin/components/ui/Popup";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

function toText(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
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
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 400);

    return () => clearTimeout(id);
  }, [searchText]);

  const tableFilters = useMemo(() => {
    const next = {};
    const trimmedSearch = String(debouncedSearchText || "").trim();
    if (trimmedSearch) next.search = trimmedSearch;
    if (status) next.status = status;
    return next;
  }, [debouncedSearchText, status]);

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
        <SgPageHead header="Məhsullar" description="Məhsulların siyahısı." filter={true}>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <div style={{ width: 200 }}>
              <SgInput
                variant="select"
                size="small"
                labelHidden={true}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { id: "active", name: "Aktiv" },
                  { id: "passive", name: "Deaktiv" },
                ]}
              />
            </div>
            <div style={{ width: 260 }}>
              <SgInput
                size="small"
                labelHidden={true}
                type="text"
                placeholder="Axtar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <SgButton type="link" to="/admin/products/create" color="primary" size="md" icon="plus">
              Əlavə et
            </SgButton>

          </div>
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
                      <SgButton type="link" to={`/admin/products/edit/${row?.id}`} size="sm" color="secondary-outline" icon="pen" onlyIcon={true} minimal={true} />
                      <SgButton size="sm" color="error-outline" icon="trash" onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
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
