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
import { EDIT_MODEL_BY_ID_ROUTE, GET_MARKS_ROUTE, GET_MODEL_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import { getBase64 } from "@/admin/utils/getBase64";

function normalizeListResponse(resp) {
  const payload = resp?.data?.data ?? resp?.data ?? null;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const [marks, setMarks] = useState([]);
  const router = useRouter();
  const params = useParams();
  const modelId = params?.model_id;

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

    const errors = validate(data, "modelCreate", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }

    const payload = {
      markId: data.markId ?? "",
      name: String(data.name || ""),
      image: String(data.image || ""),
    };

    ApiService.put(`${EDIT_MODEL_BY_ID_ROUTE}/${modelId}`, { ...payload })
      .then(() => {
        router.push("/admin/models");
      })
      .catch(() => {});
  }

  useEffect(() => {
    ApiService.get(GET_MARKS_ROUTE)
      .then((resp) => {
        const list = normalizeListResponse(resp);
        const options = list
          .filter((m) => m?.id != null)
          .map((m) => ({ id: m.id, name: m?.name ?? m?.title ?? m?.label ?? String(m.id) }));
        setMarks(options);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!modelId) return;
    ApiService.get(`${GET_MODEL_BY_ID_ROUTE}/${modelId}`, { _skipLang: true })
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const model = payload?.model ?? payload;
        const next = {
          ...(model || {}),
          name: model?.name ?? "",
          image: model?.image ?? "",
          markId: model?.markId ?? model?.mark_id ?? model?.mark?.id ?? "",
        };

        setData(next);
      })
      .catch(() => {});
  }, [modelId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Modeli düzəlt" filter={true}>
          <SgButton type="link" to="/admin/models" color="primary" size="md">
            Modellər
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <SgFormGroup>
                    <SgInput
                      name="markId"
                      id="markId"
                      placeholder="Marka seçin"
                      label="Marka"
                      variant="select"
                      searchAble={true}
                      options={marks}
                      value={data.markId ?? ""}
                      onChange={handleChange}
                      isInvalid={valueErrors.markId}
                    />
                  </SgFormGroup>
                </div>
              </div>

              <SgFormGroup>
                <SgInput
                  name="name"
                  id="name"
                  placeholder="Model adı"
                  label="Model adı"
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
            <SgButton color="error" size="sm" type="link" to="/admin/models">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
