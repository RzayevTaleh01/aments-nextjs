import "./globals.css";
import "@/components/ui/Form/Form.module.scss";
import "@/assets/css/style.min.css";
import Providers from "./providers";
import { getServerLang } from "@/utils/lang";

export const metadata = {
  title: {
    default: "OEM - Car Accessories Shop",
    template: "%s | OEM",
  },
  description: "OEM - Car Accessories Shop",
};

export default async function RootLayout({ children }) {
  const lang = await getServerLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
