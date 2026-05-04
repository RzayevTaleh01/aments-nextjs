import ProductDetailsPage from "@/components/pages/ProductDetailsPage/ProductDetailsPage";
import { products } from "@/constants/products";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details",
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug;
  if (!slug) notFound();
  const exists = products.some((p) => p.slug === slug);
  if (!exists) notFound();
  return <ProductDetailsPage productSlug={slug} variant="default" />;
}
