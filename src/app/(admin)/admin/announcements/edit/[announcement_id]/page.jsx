"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useEffect, useState } from "react";
import { SgFile, SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { EDIT_ANNOUNCEMENT_BY_ID_ROUTE, GET_ANNOUNCEMENT_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { callBackChangeDataFile } from "@/admin/utils/changeDataFile";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [filesProgress, setFilesProgress] = useState(null);
  const router = useRouter();
  const params = useParams();
  const announcementId = params?.announcement_id;

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  function handleFileChange(e) {
    callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "announcementCreate", validationConstraints);

    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
    } else {
      ApiService.put(`${EDIT_ANNOUNCEMENT_BY_ID_ROUTE}/${announcementId}`, { data })
        .then(() => {
          router.push("/admin/announcements");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (!announcementId) return;
    ApiService.get(`${GET_ANNOUNCEMENT_BY_ID_ROUTE}/${announcementId}`)
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [announcementId]);

  return (
    <MainLayout permission="announcementsEdit">
      <SgPage>
        <SgPageHead header="Elanlar" filter={true}>
          <SgButton type="link" isLinked={true} to="/admin/announcements" color="primary" size="md">
            Elanlar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <SgFormGroup>
                <SgInput
                  name="title"
                  id="title"
                  placeholder="Elanın adını daxil edin"
                  label="Elanın adı"
                  value={data.title || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.title}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="publishDate"
                  id="publishDate"
                  placeholder="Tarix seç"
                  label="Dərc olunma tarixi"
                  variant="date"
                  type="date"
                  dateFormat="YYYY-MM-DD"
                  value={data.publishDate || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.publishDate}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="description"
                  id="description"
                  placeholder="Mətn..."
                  label="Elanın mətni"
                  variant="editor"
                  value={data.description || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.description}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgFile
                  accepts="image/jpeg, image/png, image/jpg"
                  label="Şəkil"
                  onChange={handleFileChange}
                  onRemove={handleChange}
                  value={data.image}
                  id="image"
                  name="image"
                  isInvalid={valueErrors.image}
                />
              </SgFormGroup>
            </div>
          </div>
        </SgPageBody>
        <SgPageFooter>
          <SgButtonGroup gap={true}>
            <SgButton color="primary" size="sm" onClick={handleSubmit}>
              Yadda saxla
            </SgButton>
            <SgButton color="error" size="sm" type="link" to="/admin/announcements">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
