import { HomePage } from "@/components/pages";
import ApiService from "@/services/api/ApiService";

export const metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

async function getPopularCategoriesForHome() {
  try {
    const res = await ApiService.get("/statistics/category/popular");
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
