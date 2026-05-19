"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useEffect, useState } from "react";
import { SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { EDIT_MARK_BY_ID_ROUTE, GET_MARK_BY_ID_ROUTE } from "@/admin/configs/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const router = useRouter();
  const params = useParams();
  const markId = params?.mark_id;

  function handleChange(e) {
    changeData(e, data, setData, valueErrors, setValueErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(data, "markCreate", validationConstraints);
    if (Object.keys(errors).length > 0) {
      setValueErrors(errors);
      return;
    }

    const payload = {
      name: String(data.name || ""),
    };

    ApiService.put(`${EDIT_MARK_BY_ID_ROUTE}/${markId}`, { ...payload })
      .then(() => {
        toast.success("Uğurla yeniləndi");
        router.push("/admin/marks");
      })
      .catch(() => {
        toast.error("Xəta baş verdi");
      });
  }

  useEffect(() => {
    if (!markId) return;
    ApiService.get(`${GET_MARK_BY_ID_ROUTE}/${markId}`, { _skipLang: true })
      .then((resp) => {
        const payload = resp?.data?.data ?? {};
        const mark = payload?.mark ?? payload;
        const next = {
          ...(mark || {}),
          name: mark?.name ?? "",
        };

        setData(next);
      })
      .catch(() => {});
  }, [markId]);

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Markanı düzəlt" filter={true}>
          <SgButton type="link" to="/admin/marks" color="primary" size="md">
            Markalar
          </SgButton>
        </SgPageHead>
        <SgPageBody>
          <div className={["row"].join(" ").trim()}>
            <div className="col-lg-12">
              <SgFormGroup>
                <SgInput
                  name="name"
                  id="name"
                  placeholder="Marka adı"
                  label="Marka adı"
                  value={data.name || ""}
                  onChange={handleChange}
                  isInvalid={valueErrors.name}
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
            <SgButton color="error" size="sm" type="link" to="/admin/marks">
              Ləğv et
            </SgButton>
          </SgButtonGroup>
        </SgPageFooter>
      </SgPage>
    </MainLayout>
  );
}
