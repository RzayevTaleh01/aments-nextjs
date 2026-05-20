import ApiService from "@/services/api/ApiService";
import { ALL_PRODUCTS_ROUTE } from "@/configs/apiRoutes";
import { mapHomeProduct } from "@/mappers/home-product.mapper";

export async function getHomeProducts({ lang } = {}) {
  const res = await ApiService.get(ALL_PRODUCTS_ROUTE, { params: { lang } });
  const data = res?.data?.data ?? {};
  const list = Array.isArray(data?.products) ? data.products : [];
  return list.map((x) => mapHomeProduct(x)).filter((x) => x?.id != null && x?.name);
}

