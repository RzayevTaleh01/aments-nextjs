export const products = [
  {
    id: "p1",
    name: "Kapot",
    slug: "kapot",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    href: `/product/1`,
    imageSrc: "/assets/image/products_images/aments_products_image_1.jpg",
    price: "230.00 AZN",
    code: "BST-9922",
    oem_code: "oem2354353",
    brand: { id: 1, name: "OilPR", slug: "oilpr" },
    mark: { id: 1, name: "Tesla", slug: "tesla" },
    model: { id: 2, name: "Model S", slug: "model-s" },
    categoryId: 3,
    offerGroups: [
      {
        title: "Axtarılan kod",
        rows: [
          { img: "/assets/images/products_images/aments_products_image_1.jpg", brand: "OilPR", code: "3244t54t", name: "Kapot", warehouse: "Xırdalan", qty: 1, price: "139.35 AZN" },
          { img: "/assets/images/products_images/aments_products_image_1.jpg", brand: "OilPR", code: "3244t54t", name: "Kapot", warehouse: "Babək", qty: 3, price: "139.35 AZN" },
        ],
      },
      {
        title: "Əvəzləyici",
        rows: [
          { img: "/assets/images/products_images/aments_products_image_2.jpg", brand: "MANDO", code: "BN3244t54t", name: "Kapot", warehouse: "Babək", qty: 0, price: "188.96 AZN" },
          { img: "/assets/images/products_images/aments_products_image_2.jpg", brand: "MANDO", code: "BN3244t54t", name: "Kapot", warehouse: "Xırdalan", qty: 1, price: "188.96 AZN" },
        ],
      },
    ],
  }
];
