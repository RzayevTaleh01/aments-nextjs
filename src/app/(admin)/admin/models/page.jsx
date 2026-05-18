"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import SgTable from "@/admin/components/ui/Table";
import { DELETE_MODEL_BY_ID_ROUTE, GET_MARKS_ROUTE, GET_MODELS_ROUTE } from "@/admin/configs/apiRoutes";
import { SgButton } from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import ApiService from "@/admin/services/ApiService";
import { SgPopup } from "@/admin/components/ui/Popup";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import TableFilter from "@/admin/components/ui/TableFilter/TableFilter";
import { pickText, toText } from "@/admin/utils/text";
import { CONTENT_LANGUAGE_OPTIONS, CONTENT_LANGUAGES } from "@/admin/constants/constants";

export default function Page() {
  const [reloadKey, setReloadKey] = useState(0);
  const [tableFilters, setTableFilters] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  function toEditUrl(id) {
    const lang = tableFilters?.lang;
    const base = `/admin/models/edit/${id}`;
    return lang ? `${base}?lang=${encodeURIComponent(lang)}` : base;
  }

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
    ApiService.delete(`${DELETE_MODEL_BY_ID_ROUTE}/${id}`)
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
        <SgPageHead header="Modellər" description="Modellərin siyahısı." filter={true}>
          <SgButton type="link" to="/admin/models/create" color="primary" size="md" icon={FaPlus}>
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
                filterKey: "search",
                inputProps: {
                  size: "small",
                  labelHidden: true,
                  type: "text",
                  placeholder: "Ada görə axtar...",
                },
              },
              {
                key: "markId",
                kind: "select",
                width: 220,
                filterKey: "markId",
                defaultValue: "all",
                selectProps: {
                  variant: "select",
                  size: "small",
                  labelHidden: true,
                  placeholder: "Marka",
                  searchAble: true,
                },
                options: {
                  type: "api",
                  api: GET_MARKS_ROUTE,
                  includeAll: true,
                  allValue: "all",
                  allLabel: "Marka seç",
                },
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
                  key: "mark",
                  name: "Marka",
                  hidden: false,
                  cell: (row) =>
                    <>
                      {toText(row?.mark) ||
                        pickText(row, ["markName", "mark_name", "markTitle", "markId", "mark_id"])}
                    </>,
                },
                {
                  key: "name",
                  name: "Model adı",
                  hidden: false,
                  cell: (row) => <>{pickText(row, ["name", "translations"])}</>,
                },
                {
                  key: "actions",
                  name: "Actions",
                  hidden: false,
                  hoverable: false,
                  cell: (row) => (
                    <SgButtonGroup gap={true}>
                      <SgButton type="link" to={toEditUrl(row?.id)} size="sm" color="secondary-outline" icon={FaPen} onlyIcon={true} minimal={true} />
                      <SgButton size="sm" color="error-outline" icon={FaTrash} onlyIcon={true} minimal={true} onClick={() => openDeleteModal(row)} />
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_MODELS_ROUTE,
              filters: tableFilters,
            }}
          />
          <SgPopup
            header="Modeli sil"
            description={`Bu modeli silmək istəyirsiniz? (ID: ${selectedRow?.id ?? "-"})`}
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
