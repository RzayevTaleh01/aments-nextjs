"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useEffect, useState } from "react";
import { SgFile, SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { CONTENT_LANGUAGE_OPTIONS, CONTENT_LANGUAGES, validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { EDIT_CATEGORY_BY_ID_ROUTE, GET_CATEGORY_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import { getBase64 } from "@/admin/utils/getBase64";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [activeLang, setActiveLang] = useState(CONTENT_LANGUAGES.AZ);
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.category_id;

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

    const errors = validate(data, "categoryCreate", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }

    const translations = CONTENT_LANGUAGE_OPTIONS.map((l) => ({
      languageCode: l.id,
      name: data[`name_${l.id}`] || "",
    })).filter((t) => t.name);

    const payload = {
      image: String(data.image || ""),
      translations,
    };

    ApiService.put(`${EDIT_CATEGORY_BY_ID_ROUTE}/${categoryId}`, { data: payload })
      .then(() => {
        router.push("/admin/categories");
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (!categoryId) return;
    ApiService.get(`${GET_CATEGORY_BY_ID_ROUTE}/${categoryId}`)
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const category = payload?.category ?? payload;
        const next = { ...(category || {}) };

        const translations = Array.isArray(category?.translations) ? category.translations : [];
        CONTENT_LANGUAGE_OPTIONS.forEach((l) => {
          const hit = translations.find((t) => String(t?.languageCode || "").toLowerCase() === String(l.id).toLowerCase());
          if (hit) {
            next[`name_${l.id}`] = hit?.name ?? "";
          }
        });

        if (!next[`name_${CONTENT_LANGUAGES.AZ}`]) next[`name_${CONTENT_LANGUAGES.AZ}`] = category?.name ?? "";
        if (!next.image) next.image = category?.image ?? "";

        setData(next);
      })
      .catch(() => {});
  }, [categoryId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Kateqoriyanı düzəlt" filter={true}>
          <SgButton type="link" to="/admin/categories" color="primary" size="md">
            Kateqoriyalar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <div style={{ marginBottom: 16 }}>
                <SgButtonGroup gap={true} className="mt-2">
                  {CONTENT_LANGUAGE_OPTIONS.map((lang) => (
                    <SgButton key={lang.id} color={activeLang === lang.id ? "primary" : "secondary-outline"} onClick={() => setActiveLang(lang.id)} type="button">
                      {lang.name}
                    </SgButton>
                  ))}
                </SgButtonGroup>
              </div>

              <SgFormGroup>
                <SgInput
                  name={`name_${activeLang}`}
                  id={`name_${activeLang}`}
                  placeholder="Kateqoriya adı"
                  label={`Kateqoriya adı (${activeLang.toUpperCase()})`}
                  value={data[`name_${activeLang}`] || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors[`name_${activeLang}`]}
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
            <SgButton color="error" size="sm" type="link" to="/admin/categories">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}

