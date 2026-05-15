"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgPage, SgPageBody, SgPageFooter, SgPageHead } from "@/admin/components/ui/Page";
import { SgButton } from "@/admin/components/ui/Button";
import { useState } from "react";
import { SgFormGroup, SgInput } from "@/admin/components/ui/Form";
import { changeData } from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import { validate } from "@/admin/utils/validate";
import { validationConstraints } from "@/admin/constants/constants";
import ApiService from "@/admin/services/ApiService";
import { CREATE_MARK_ROUTE } from "@/admin/configs/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const [data, setData] = useState({});
  const [valueErrors, setValueErrors] = useState({});
  const router = useRouter();

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

    ApiService.post(`${CREATE_MARK_ROUTE}`, payload)
      .then(() => {
        toast.success("Uğurla əlavə edildi");
        router.push("/admin/marks");
      })
      .catch(() => {});
  }

  return (
    <MainLayout>
      <SgPage>
        <SgPageHead header="Marka əlavə et" filter={true}>
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
