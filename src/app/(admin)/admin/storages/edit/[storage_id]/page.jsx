"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useEffect, useState } from "react";
import { SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { CONTENT_LANGUAGE_OPTIONS, CONTENT_LANGUAGES, validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { EDIT_STORAGE_BY_ID_ROUTE, GET_STORAGE_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [activeLang, setActiveLang] = useState(CONTENT_LANGUAGES.AZ);
  const router = useRouter();
  const params = useParams();
  const storageId = params?.storage_id;

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "storageCreate", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }

    const translations = CONTENT_LANGUAGE_OPTIONS.map((l) => ({
      languageCode: l.id,
      name: data[`name_${l.id}`] || "",
      address: data[`address_${l.id}`] || "",
    })).filter((t) => t.name || t.address);

    const payload = {
      translations,
      sell_type: Number(data.sell_type ?? 1) || 1,
    };

    ApiService.put(`${EDIT_STORAGE_BY_ID_ROUTE}/${storageId}`, { ...payload })
      .then(() => {
        router.push("/admin/storages");
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (!storageId) return;
    ApiService.get(`${GET_STORAGE_BY_ID_ROUTE}/${storageId}`)
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const storage = payload?.storage ?? payload;
        const next = { ...(storage || {}) };

        const translations = Array.isArray(storage?.translations) ? storage.translations : [];
        CONTENT_LANGUAGE_OPTIONS.forEach((l) => {
          const hit = translations.find((t) => String(t?.languageCode || "").toLowerCase() === String(l.id).toLowerCase());
          if (hit) {
            next[`name_${l.id}`] = hit?.name ?? "";
            next[`address_${l.id}`] = hit?.address ?? "";
          }
        });

        if (!next[`name_${CONTENT_LANGUAGES.AZ}`]) next[`name_${CONTENT_LANGUAGES.AZ}`] = storage?.name ?? "";
        if (!next[`address_${CONTENT_LANGUAGES.AZ}`]) next[`address_${CONTENT_LANGUAGES.AZ}`] = storage?.address ?? "";

        if (!next.image) next.image = storage?.image ?? "";
        if (!next.sell_type) next.sell_type = storage?.sell_type ?? storage?.sellType ?? 1;

        setData(next);
      })
      .catch(() => {});
  }, [storageId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Anbarı düzəlt" filter={true}>
          <SgButton type="link" to="/admin/storages" color="primary" size="md">
            Anbarlar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <div style={{ marginBottom: 16 }}>
                <SgButtonGroup gap={true} className="mt-2">
                  {CONTENT_LANGUAGE_OPTIONS.map((lang) => (
                    <SgButton
                      key={lang.id}
                      color={activeLang === lang.id ? "primary" : "secondary-outline"}
                      onClick={() => setActiveLang(lang.id)}
                      type="button"
                    >
                      {lang.name}
                    </SgButton>
                  ))}
                </SgButtonGroup>
              </div>

              <SgFormGroup>
                <SgInput
                  name={`name_${activeLang}`}
                  id={`name_${activeLang}`}
                  placeholder="Anbarın adı"
                  label={`Anbarın adı (${activeLang.toUpperCase()})`}
                  value={data[`name_${activeLang}`] || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors[`name_${activeLang}`]}
                />
              </SgFormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name={`address_${activeLang}`}
                      id={`address_${activeLang}`}
                      placeholder="Ünvan"
                      label={`Ünvan (${activeLang.toUpperCase()})`}
                      value={data[`address_${activeLang}`] || ""}
                      onChange={handleChange}
                      isInvalid={valueErrors[`address_${activeLang}`]}
                    />
                  </SgFormGroup>
                </div>
                <div className="col-lg-6">
                  <SgFormGroup>
                    <SgInput
                      name="sell_type"
                      id="sell_type"
                      label="Sell type"
                      variant="select"
                      options={[
                        { id: 1, name: "Topdan" },
                        { id: 2, name: "Pərakəndə" },
                      ]}
                      value={data.sell_type ?? 1}
                      onChange={handleChange}
                      isInvalid={valueErrors.sell_type}
                    />
                  </SgFormGroup>
                </div>
              </div>

            </div>
          </div>
        </SgPageBody>
        <SgPageFooter>
          <SgButtonGroup gap={true}>
            <SgButton color="primary" size="sm" onClick={handleSubmit}>
              Yadda saxla
            </SgButton>
            <SgButton color="error" size="sm" type="link" to="/admin/storages">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
