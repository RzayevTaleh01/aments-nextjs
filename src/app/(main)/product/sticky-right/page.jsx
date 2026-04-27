import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details Sticky Right",
};

export default function Page() {
  return (
    <ProductDetailsPage
      title="Product Details Sticky Right"
      breadcrumbLabel="Product Details Sticky Right"
      variant="sticky-right"
    />
  );
}

