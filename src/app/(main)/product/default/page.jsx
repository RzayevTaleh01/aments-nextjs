import { redirect } from "next/navigation";
import { products } from "@/constants/products";

export const metadata = {
    title: "Product Details Default",
};

export default function Page() {
    const firstSlug = products?.[0]?.slug;
    if (firstSlug) redirect(`/product/${firstSlug}`);
    redirect("/");
}

