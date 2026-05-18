import HomePage from "@/components/pages/HomePage";
import ApiService from "@/services/api/ApiService";
import { STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

function toErrorMessage(error) {
  const code = error?.code ? String(error.code) : "";
  const message = error?.message ? String(error.message) : "";
  if (code && message) return `${code}: ${message}`;
  return message || code || "Request failed";
}

async function getPopularCategoriesForHome() {
  try {
    const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE);
    if (!res?.data?.data || !Array.isArray(res.data.data)) return { data: null, error: null };
    return { data: res.data.data, error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export default async function Page() {
  const popularCategoriesApi = await getPopularCategoriesForHome();
  return <HomePage popularCategories={popularCategoriesApi.data} popularCategoriesError={popularCategoriesApi.error} />;
}
