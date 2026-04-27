import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details Single Slide",
};

export default function Page() {
  return (
    <ProductDetailsPage
      title="Product Details Single Slide"
      breadcrumbLabel="Product Details Single Slide"
      variant="single-slide"
    />
  );
}

