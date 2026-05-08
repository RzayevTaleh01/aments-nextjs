"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useState } from "react";
import { SgFile, SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { CREATE_PRODUCT_ROUTE } from "@/admin/configs/apiRoutes";
import { callBackChangeDataFile } from "@/admin/utils/changeDataFile";
import { useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [filesProgress, setFilesProgress] = useState(null);
  const router = useRouter();

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  function handleFileChange(e) {
    callBackChangeDataFile(e, data, setData, valueErrors, setValueErrors, null, filesProgress, setFilesProgress);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "productCreate", validationConstraints);

    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
    } else {
      ApiService.post(`${CREATE_PRODUCT_ROUTE}`, { data })
        .then(() => {
          router.push("/admin/products");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Məhsul əlavə et" filter={true}>
          <SgButton type="link" to="/admin/products" color="primary" size="md">
            Məhsullar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <SgFormGroup>
                <SgInput
                  name="name"
                  id="name"
                  placeholder="Məhsul adı"
                  label="Məhsul adı"
                  value={data.name || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.name}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="slug"
                  id="slug"
                  placeholder="məs: teker"
                  label="Slug"
                  value={data.slug || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.slug}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="code"
                  id="code"
                  placeholder="BST-9922"
                  label="Kod"
                  value={data.code || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.code}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="oem_code"
                  id="oem_code"
                  placeholder="0451103313"
                  label="OEM kod"
                  value={data.oem_code || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.oem_code}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="similar_oem_codes"
                  id="similar_oem_codes"
                  placeholder="W712/94, OP526/1, OC295"
                  label="Similar OEM kodlar"
                  value={data.similar_oem_codes || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.similar_oem_codes}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="brandId"
                  id="brandId"
                  placeholder="1"
                  label="Brand ID"
                  value={data.brandId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.brandId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="markId"
                  id="markId"
                  placeholder="2"
                  label="Marka ID"
                  value={data.markId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.markId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="modelId"
                  id="modelId"
                  placeholder="3"
                  label="Model ID"
                  value={data.modelId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.modelId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="categoryId"
                  id="categoryId"
                  placeholder="2"
                  label="Kateqoriya ID"
                  value={data.categoryId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.categoryId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="posAppId"
                  id="posAppId"
                  placeholder="POS-12345"
                  label="POS App ID"
                  value={data.posAppId || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.posAppId}
                />
              </SgFormGroup>
              <SgFormGroup>
                <SgInput
                  name="isActivated"
                  id="isActivated"
                  label="Aktivlik"
                  variant="select"
                  value={data.isActivated ?? ""}
                  options={[
                    { name: "Aktiv", id: 1 },
                    { name: "Passiv", id: 0 },
                  ]}
                  onChange={handleChange}
                  isInvalid={valueErrors.isActivated}
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
            <SgButton color="error" size="sm" type="link" to="/admin/products">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
