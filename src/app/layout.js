import "./globals.css";
import "@/components/ui/Form/Form.module.scss";
import "@/assets/css/style.min.css";
import Providers from "./providers";
import { cookies } from "next/headers";

export const metadata = {
  title: {
    default: "Aments - Car Accessories Shop",
    template: "%s | Aments",
  },
  description: "Aments - Car Accessories Shop",
};

function normalizeLang(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "en";
  const base = raw.split("-")[0]?.toLowerCase();
  return base || "en";
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = normalizeLang(cookieStore?.get?.("oem_lang")?.value);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
