import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details Sticky Left",
};

export default function Page() {
  return (
    <ProductDetailsPage
      title="Product Details Sticky Left"
      breadcrumbLabel="Product Details Sticky Left"
      variant="sticky-left"
    />
  );
}

