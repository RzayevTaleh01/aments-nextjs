import ProductDetailsPage from "@/components/pages/ProductDetailsPage/ProductDetailsPage";
import { notFound } from "next/navigation";
import { getProductDetails } from "@/queries/productDetails.query";
import { getServerLang } from "@/utils/lang";

export const metadata = {
  title: "Product Details",
};

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const raw = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug;
  const id = Number(raw);
  if (!raw || !Number.isFinite(id)) notFound();

  const lang = await getServerLang();

  let data = null;
  try {
    data = await getProductDetails({ lang, id });
  } catch {
    data = null;
  }

  return <ProductDetailsPage product={data?.product ?? null} offerGroups={data?.offerGroups ?? []} variant="default" />;
}
