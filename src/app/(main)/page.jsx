import HomePage from "@/components/pages/HomePage";
import ApiService from "@/services/api/ApiService";
import { STATISTICS_CATEGORY_POPULAR_ROUTE } from "@/configs/apiRoutes";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Home",
};

async function getPopularCategoriesForHome() {
  try {
    const res = await ApiService.get(STATISTICS_CATEGORY_POPULAR_ROUTE);
    if (!res?.data?.data || !Array.isArray(res.data.data)) return null;
    return res.data.data;
  } catch {
    return null;
  }
}

export default async function Page() {
  const popularCategoriesApi = await getPopularCategoriesForHome();
  return <HomePage popularCategories={popularCategoriesApi} />;
}
