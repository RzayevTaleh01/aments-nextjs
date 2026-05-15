"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_STORAGE_BY_ID_ROUTE, GET_STORAGES_ROUTE } from "@/admin/configs/apiRoutes";
import { SgButton } from "@/admin/components/ui/Button";
import { SgBadge } from "@/admin/components/ui/Badge";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { SgPopup } from "@/admin/components/ui/Popup";
import { useState } from "react";
import { toast } from "react-toastify";
import TableFilter from "@/admin/components/ui/TableFilter/TableFilter";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

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
    ApiService.delete(`${DELETE_STORAGE_BY_ID_ROUTE}/${id}`)
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
        <SgPageHead header="Anbarlar" description="Anbarların siyahısı." filter={true}>
          <SgButton type="link" to="/admin/storages/create" color="primary" size="md" icon={FaPlus}>
            Əlavə et
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <TableFilter
            fields={[
              {
                key: "search",
                kind: "input",
                width: 260,
                debounceMs: 400,
                filterKey: "search",
                inputProps: {
                  size: "small",
                  labelHidden: true,
                  type: "text",
                  placeholder: "Ada görə axtar...",
                },
                normalize: (v) => String(v || "").trim(),
              },
              {
                key: "status",
                kind: "select",
                width: 200,
                filterKey: "status",
                defaultValue: "all",
                selectProps: {
                  variant: "select",
                  size: "small",
                  labelHidden: true,
                  placeholder: "Status",
                },
                options: [
                  { id: "all", name: "Status seç" },
                  { id: "1", name: "Aktiv" },
                  { id: "2", name: "Deaktiv" },
                ],
              },
            ]}
            onChange={(payload) => setTableFilters(payload?.filters || {})}
          />
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
                  key: "name",
                  name: "Anbarın adı",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["name"])}</>,
                },
                {
                  key: "address",
                  name: "Ünvan",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["address"])}</>,
                },
                {
                  key: "isActivated",
                  name: "Status",
                  hidden: false,
                  cell: (row) => {
                    const raw = row?.isActivated ?? row?.is_active ?? row?.status;
                    const active = String(raw) === "1" || String(raw).toLowerCase() === "active" || raw === true;
                    return (
                      <SgBadge
                        header={active ? "Aktiv" : "Passiv"}
                        className={`${active ? "sg--badge--success" : "sg--badge--error"} sg--badge--sm`}
                      />
                    );
                  },
                },
                {
                  key: "actions",
                  name: "Actions",
                  hidden: false,
                  hoverable: false,
                  cell: (row) => (
                    <SgButtonGroup gap={true}>
                      <SgButton type="link" to={`/admin/storages/edit/${row?.id}`} size="sm" color="secondary-outline" icon={FaPen} onlyIcon={true} minimal={true} />
                      <SgButton size="sm" color="error-outline" icon={FaTrash} onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_STORAGES_ROUTE,
              filters: tableFilters,
            }}
          />
          <SgPopup
            header="Anbarı sil"
            description={`Bu anbarı silmək istəyirsiniz? (ID: ${selectedRow?.id ?? "-"})`}
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
