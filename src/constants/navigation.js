export const navigation = {
  topWelcomeText: "Welcome to our store!",
  topLinks: [
    { id: "login", label: "Login", href: "/login" },
    { id: "register", label: "Register", href: "/register" },
    { id: "my-account", label: "My Account", href: "/my-account" },
    {
      id: "settings",
      label: "Setting",
      href: "#",
      children: [
        { label: "Checkout", href: "/checkout" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Wishlist", href: "/wishlist" },
      ],
    },
    {
      id: "language",
      label: "English",
      href: "#",
      children: [
        { label: "English", href: "#", iconSrc: "/assets/images/icon/lang-en.png" },
        { label: "Germany", href: "#", iconSrc: "/assets/images/icon/lang-gr.png" },
      ],
    },
    { id: "compare", label: "Compare (0)", href: "/compare", iconName: "FaRetweet" },
  ],
  main: [
    {
      id: "home",
      label: "Home",
      href: "/",
      activeMatch: "/",
      // children: [{ label: "Home 1", href: "/" }]
    },
    // {
    //   id: "shop",
    //   label: "Shop",
    //   href: "/product/default",
    //   mega: true,
    //   activeMatch: ["/shop", "/product"]
    // },
    {
      id: "pages",
      label: "Pages",
      href: "#",
      activeMatch: ["/service", "/faq", "/privacy-policy", "/404"],
      children: [
        { label: "About Us", href: "/about-us" },
        { label: "Service", href: "/service" },
        { label: "Frequently Questions", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "404 Page", href: "/404" }
      ]
    },
    { id: "contact-us", label: "Contact Us", href: "/contact-us", activeMatch: "/contact-us" },
    { id: "about-us", label: "About Us", href: "/about-us", activeMatch: "/about-us" },
    { id: "products", label: "Products", href: "/products", activeMatch: "/products" }
  ],
  // megaMenu: {
  //   shopLayouts: [
  //     { label: "Grid Left Sidebar", href: "/shop/grid/sidebar-left" },
  //     { label: "Grid Right Sidebar", href: "/shop/grid/sidebar-right" },
  //     { label: "Full Width", href: "/shop/full-width" },
  //     { label: "List Left Sidebar", href: "/shop/list/sidebar-left" },
  //     { label: "List Right Sidebar", href: "/shop/list/sidebar-right" }
  //   ],
  //   otherPages: [
  //     { label: "Cart", href: "/cart" },
  //     { label: "Wishlist", href: "/wishlist" },
  //     { label: "Compare", href: "/compare" },
  //     { label: "Checkout", href: "/checkout" },
  //     { label: "Login", href: "/login" },
  //     { label: "My Account", href: "/my-account" }
  //   ],
  //   productTypes: [
  //     { label: "Product Default", href: "/product/default" },
  //     { label: "Product Variable", href: "/product/variable" },
  //     { label: "Product Referral", href: "/product/affiliate" },
  //     { label: "Product Group", href: "/product/group" },
  //     { label: "Product Slider", href: "/product/single-slide" },
  //     { label: "Product Tab Left", href: "/product/tab-left" },
  //     { label: "Product Tab Right", href: "/product/tab-right" },
  //     { label: "Product Gallery Left", href: "/product/gallery-left" },
  //     { label: "Product Gallery Right", href: "/product/gallery-right" },
  //     { label: "Product Sticky Left", href: "/product/sticky-left" },
  //     { label: "Product Sticky right", href: "/product/sticky-right" }
  //   ],
  //   banner: {
  //     href: "/",
  //     imageSrc: "/assets/images/banner/menu-banner.jpg",
  //     alt: "Menu banner"
  //   }
  // },
  footer: {
    information: [
      { label: "Delivery", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Stores", href: "/" },
    ],
    account: [
      { label: "Legal Notice", href: "/" },
      { label: "Secure payment", href: "/" },
      { label: "Sitemap", href: "/" },
      { label: "My Account", href: "/my-account" },
    ],
  },
};
