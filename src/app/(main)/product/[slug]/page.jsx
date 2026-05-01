import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details",
};

export default function Page({ params }) {
  return <ProductDetailsPage productSlug={params?.slug} variant="default" />;
}
