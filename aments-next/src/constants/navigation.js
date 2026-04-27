export const navigation = {
  topLinks: {
    settings: [
      { label: "Checkout", href: "/checkout" },
      { label: "My Account", href: "/my-account" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" }
    ],
    currencies: ["$ USD", "EUR – Euro", "GBP – British Pound", "INR – India Rupee"],
    languages: [
      { label: "English", iconSrc: "/assets/images/icon/lang-en.png" },
      { label: "Germany", iconSrc: "/assets/images/icon/lang-gr.png" }
    ]
  },
  main: [
    {
      label: "Home",
      href: "/",
      children: [
        { label: "Home 1", href: "/" },
        { label: "Home 2", href: "/home-2" }
      ]
    },
    {
      label: "Shop",
      href: "/product/default",
      mega: true
    },
    {
      label: "Blog",
      href: "/blog/full-width",
      children: [
        { label: "Blog Grid Sidebar left", href: "/blog/grid/sidebar-left" },
        { label: "Blog Grid Sidebar Right", href: "/blog/grid/sidebar-right" },
        { label: "Blog Full Width", href: "/blog/full-width" },
        { label: "Blog Single Sidebar left", href: "/blog/post/sidebar-left" },
        { label: "Blog Single Sidebar Right", href: "/blog/post/sidebar-right" }
      ]
    },
    {
      label: "Pages",
      href: "#",
      children: [
        { label: "About Us", href: "/about-us" },
        { label: "Service", href: "/service" },
        { label: "Frequently Questions", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "404 Page", href: "/404" }
      ]
    },
    { label: "Contact Us", href: "/contact-us" }
  ],
  megaMenu: {
    shopLayouts: [
      { label: "Grid Left Sidebar", href: "/shop/grid/sidebar-left" },
      { label: "Grid Right Sidebar", href: "/shop/grid/sidebar-right" },
      { label: "Full Width", href: "/shop/full-width" },
      { label: "List Left Sidebar", href: "/shop/list/sidebar-left" },
      { label: "List Right Sidebar", href: "/shop/list/sidebar-right" }
    ],
    otherPages: [
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Compare", href: "/compare" },
      { label: "Checkout", href: "/checkout" },
      { label: "Login", href: "/login" },
      { label: "My Account", href: "/my-account" }
    ],
    productTypes: [
      { label: "Product Default", href: "/product/default" },
      { label: "Product Variable", href: "/product/variable" },
      { label: "Product Referral", href: "/product/affiliate" },
      { label: "Product Group", href: "/product/group" },
      { label: "Product Slider", href: "/product/single-slide" },
      { label: "Product Tab Left", href: "/product/tab-left" },
      { label: "Product Tab Right", href: "/product/tab-right" },
      { label: "Product Gallery Left", href: "/product/gallery-left" },
      { label: "Product Gallery Right", href: "/product/gallery-right" },
      { label: "Product Sticky Left", href: "/product/sticky-left" },
      { label: "Product Sticky right", href: "/product/sticky-right" }
    ],
    banner: {
      href: "/",
      imageSrc: "/assets/images/banner/menu-banner.jpg",
      alt: "Menu banner"
    }
  },
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
