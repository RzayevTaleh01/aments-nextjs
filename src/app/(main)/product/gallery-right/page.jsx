import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details Gallery Right",
};

export default function Page() {
  return (
    <ProductDetailsPage
      title="Product Details Gallery Right"
      breadcrumbLabel="Product Details Gallery Right"
      variant="gallery-right"
    />
  );
}

