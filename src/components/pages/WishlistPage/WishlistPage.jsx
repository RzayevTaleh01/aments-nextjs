"use client";

import { Breadcrumb } from "@/components/ui";
import { WishlistSection } from "@/components/sections";

export default function WishlistPage() {
  const items = [
    { img: "/assets/images/products_images/aments_products_image_1.jpg", name: "Handbag fringilla", price: "$65.00" },
    { img: "/assets/images/products_images/aments_products_image_2.jpg", name: "Handbags justo", price: "$90.00" },
    { img: "/assets/images/products_images/aments_products_image_3.jpg", name: "Handbag elit", price: "$80.00" },
  ];

  return (
    <div>
      <Breadcrumb
        title="Wishlist"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "Wishlist" },
        ]}
      />

      <WishlistSection items={items} />
    </div>
  );
}
