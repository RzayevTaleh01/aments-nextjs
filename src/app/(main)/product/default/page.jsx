import {ProductDetailsPage} from "@/components/pages";

export const metadata = {
    title: "Product Details Default",
};

export default function Page() {
    return <ProductDetailsPage
        title="Product Details Default"
        breadcrumbLabel="Product Details Default"
        variant="default"
    />;
}

