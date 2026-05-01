import { ProductDetailsPage } from "@/components/pages";
import { products } from "@/constants/products";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details",
};

export default function Page({ params }) {
  const slug = params?.slug;
  if (!slug) notFound();
  const exists = products.some((p) => p.slug === slug);
  if (!exists) notFound();
  return <ProductDetailsPage productSlug={slug} variant="default" />;
}
