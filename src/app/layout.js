import "./globals.css";
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
        <link rel="stylesheet" href="/assets/css/style.min.css" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
