"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import SgTable from "@/admin/components/ui/Table";
import { useEffect, useState } from "react";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { SgPopup } from "@/admin/components/ui/Popup";
import ApiService from "@/admin/services/ApiService";
import { DELETE_ANNOUNCEMENT_BY_ID_ROUTE, GET_ANNOUNCEMENTS_ROUTE, OPTIONS_SECTORS_ROUTE } from "@/admin/configs/apiRoutes";
import { SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";

export default function Page() {
  const [selectedRow, setSelectedRow] = useState({});
  const [filters, setFilters] = useState({});
  const [filtersErrors, setFiltersErrors] = useState({});
  const [removeItemModal, setRemoveItemModal] = useState(false);
  const [filterData, setFilterData] = useState({});

  function toggleRemoveItemModal() {
    setRemoveItemModal(!removeItemModal);
  }

  function handleRemoveItem() {
    ApiService.delete(`${DELETE_ANNOUNCEMENT_BY_ID_ROUTE}/${selectedRow.id}`)
      .then(() => {
        toggleRemoveItemModal();
        setFilters(filters);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(e) {
    changeData(e, filters, setFilters, filtersErrors, setFiltersErrors);
  }

  useEffect(() => {
    ApiService.get(OPTIONS_SECTORS_ROUTE).then((response) => {
      setFilterData((prevState) => ({
        ...prevState,
        sectors: response.data.data,
      }));
    });
  }, []);

  return (
    <MainLayout permission="announcementsIndex">
      <SgPage>
        <SgPageHead header="Elanlar" description="Elanların siyahısı." filter={true}>
          <SgButton type="link" isLinked={true} to="/admin/announcements/create" color="primary" size="md" icon="plus">
            Elan əlavə et
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div>
            <div className="row align-items-end gap-y-[16px]">
              <div className="col-lg-4">
                <SgInput
                  id="title"
                  name="title"
                  type="text"
                  value={filters.title || ""}
                  onChange={handleChange}
                  label="Axtarış"
                  placeholder="Axtarış..."
                />
              </div>

              <div className="col-lg-4">
                <SgButton color="error-outline" onClick={() => setFilters({})}>
                  Filterləri təmizlə
                </SgButton>
              </div>
            </div>
          </div>

          <SgTable
            tableData={{
              data: [
                {
                  key: "id",
                  name: "ID",
                  hidden: false,
                  cell: (_, key) => <>{key}</>,
                },
                {
                  key: "title",
                  name: "Elanın adı",
                  hidden: false,
                  cell: (_, key) => <>{key}</>,
                },
                {
                  key: "id",
                  name: "Əməliyyatlar",
                  hidden: false,
                  cell: (_, key) => (
                    <SgButtonGroup>
                      <SgButton size="xs" color="primary" type="link" to={`/admin/announcements/edit/${key}`}>
                        Düzəliş et
                      </SgButton>
                      <SgButton size="xs" color="error" onClick={toggleRemoveItemModal}>
                        Sil
                      </SgButton>
                    </SgButtonGroup>
                  ),
                },
              ],
              api: GET_ANNOUNCEMENTS_ROUTE,
              filters: { ...filters },
            }}
            onClick={(_, row) => {
              setSelectedRow(row);
            }}
          />
        </SgPageBody>

        <SgPopup
          header="Silmək"
          description=" "
          size="md"
          setToggleModal={toggleRemoveItemModal}
          toggleModal={removeItemModal}
        >
          <SgButtonGroup gap={true}>
            <SgButton size="lg" color="error" onClick={handleRemoveItem}>
              Sil
            </SgButton>
            <SgButton size="lg" color="primary" onClick={toggleRemoveItemModal}>
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPopup>
      </SgPage>
    </MainLayout>
  );
}
