import { ProductDetailsPage } from "@/components/pages";

export const metadata = {
  title: "Product Details Gallery Left",
};

export default function Page() {
  return (
    <ProductDetailsPage
      title="Product Details Gallery Left"
      breadcrumbLabel="Product Details Gallery Left"
      variant="gallery-left"
    />
  );
}

