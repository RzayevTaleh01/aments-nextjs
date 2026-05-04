import ProductDetailsPage from "@/components/pages/ProductDetailsPage/ProductDetailsPage";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details",
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  const raw = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug;
  const id = Number(raw);
  if (!raw || !Number.isFinite(id)) notFound();
  return <ProductDetailsPage productApiId={id} variant="default" />;
}
