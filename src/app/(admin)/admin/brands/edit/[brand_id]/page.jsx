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
import { EDIT_BRAND_BY_ID_ROUTE, GET_BRAND_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import { getBase64 } from "@/admin/utils/getBase64";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const router = useRouter();
  const params = useParams();
  const brandId = params?.brand_id;

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  async function handleImageChange(e) {
    const file = (e?.target?.files || [])[0];
    if (!file) return;

    const dataUrl = await new Promise((resolve) => {
      getBase64(file, (result64) => resolve(String(result64?.result || "")));
    });

    setData((prev) => ({ ...prev, image: dataUrl }));
  }

  function handleImageRemove() {
    setData((prev) => ({ ...prev, image: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "brandCreate", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }

    const payload = {
      name: String(data.name || ""),
      image: String(data.image || ""),
    };

    ApiService.put(`${EDIT_BRAND_BY_ID_ROUTE}/${brandId}`, { ...payload })
      .then(() => {
        router.push("/admin/brands");
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (!brandId) return;
    ApiService.get(`${GET_BRAND_BY_ID_ROUTE}/${brandId}`)
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const brand = payload?.brand ?? payload;
        const next = {
          ...(brand || {}),
          name: brand?.name ?? "",
          image: brand?.image ?? "",
        };

        setData(next);
      })
      .catch(() => {});
  }, [brandId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Brendi düzəlt" filter={true}>
          <SgButton type="link" to="/admin/brands" color="primary" size="md">
            Brendlər
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <SgFormGroup>
                <SgInput
                  name="name"
                  id="name"
                  placeholder="Brend adı"
                  label="Brend adı"
                  value={data.name || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.name}
                />
              </SgFormGroup>

              <SgFormGroup>
                <SgFile
                  accepts="image/jpeg, image/png, image/jpg, image/webp"
                  label="Şəkil"
                  multiple={false}
                  onChange={handleImageChange}
                  onRemove={handleImageRemove}
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
            <SgButton color="error" size="sm" type="link" to="/admin/brands">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
