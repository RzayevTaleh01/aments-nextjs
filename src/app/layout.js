import "./globals.css";
import "@/components/ui/Form/Form.module.scss";
import "@/assets/css/style.min.css";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Aments - Car Accessories Shop",
    template: "%s | Aments",
  },
  description: "Aments - Car Accessories Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
