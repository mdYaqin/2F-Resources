import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "@/styles/scss/bootstrap.scss";
import "./globals.css";

import { Open_Sans, Teko } from "next/font/google";
import ClientLayout from "./ClientLayout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-teko",
  display: "swap",
});

export const metadata = {
  title: "2F Resources",
  description: "Trusted home renovation experts in Singapore.",
  openGraph: {
    title: "2F Resources",
    description: "Transform your home with professional renovation services.",
    url: "https://www.2fresources.com/",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${teko.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#232121" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="d-flex flex-column min-vh-100" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
