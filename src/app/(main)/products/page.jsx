import ProductCatalogPage from "@/components/pages/ProductCatalogPage";
import { getProducts } from "@/queries/products.query";
import { getServerLang } from "@/utils/lang";

export const metadata = {
  title: "Products",
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const lang = await getServerLang();

  const rawQ = resolvedSearchParams?.q ?? "";
  const rawCategoryId = resolvedSearchParams?.categoryId ?? "";
  const rawBrandId = resolvedSearchParams?.brandId ?? "";
  const rawMarkId = resolvedSearchParams?.markId ?? "";
  const rawModelId = resolvedSearchParams?.modelId ?? "";
  const rawPage = resolvedSearchParams?.page ?? "";

  const params = {};
  if (String(rawQ || "").trim()) params.q = String(rawQ).trim();
  if (String(rawCategoryId || "").trim()) params.categoryId = String(rawCategoryId).trim();
  if (String(rawBrandId || "").trim()) params.brandId = String(rawBrandId).trim();
  if (String(rawMarkId || "").trim()) params.markId = String(rawMarkId).trim();
  if (String(rawModelId || "").trim()) params.modelId = String(rawModelId).trim();
  if (String(rawPage || "").trim()) params.page = String(rawPage).trim();

  let initialProducts = [];
  let initialMeta = null;
  let initialSimilarProducts = [];
  let initialSimilarTotal = null;

  try {
    const res = await getProducts({ lang, params });
    initialProducts = res.products;
    initialMeta = res.meta;
    initialSimilarProducts = res.similarProducts;
    initialSimilarTotal = res.similarTotal;
  } catch {
    initialProducts = [];
    initialMeta = null;
    initialSimilarProducts = [];
    initialSimilarTotal = null;
  }

  return (
    <ProductCatalogPage
      withSidebar
      title="Product List"
      sidebarPosition="left"
      defaultView="grid"
      searchParamKey="q"
      initialProducts={initialProducts}
      initialMeta={initialMeta}
      initialSimilarProducts={initialSimilarProducts}
      initialSimilarTotal={initialSimilarTotal}
    />
  );
}
