import ApiService from "@/services/api/ApiService";
import { BRANDS_ROUTE } from "@/configs/apiRoutes";
import { mapBrand } from "@/mappers/brand.mapper";

export async function getBrands({ lang } = {}) {
  const res = await ApiService.get(BRANDS_ROUTE, { params: { lang } });
  const payload = res?.data?.data ?? res?.data ?? null;
  const list =
    (Array.isArray(payload) && payload) ||
    (Array.isArray(payload?.data) && payload.data) ||
    (Array.isArray(payload?.brands) && payload.brands) ||
    (Array.isArray(payload?.brand) && payload.brand) ||
    (Array.isArray(payload?.data?.brands) && payload.data.brands) ||
    (Array.isArray(payload?.data?.brand) && payload.data.brand) ||
    [];
  return list.map((x) => mapBrand(x)).filter((x) => x.id != null && x.name);
}
