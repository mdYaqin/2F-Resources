// src/app/layout.tsx
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
  title: "2F Resources | Home Renovation Experts in Singapore",
  description:
    "Transform your home with 2F Resources. We offer quality renovation services tailored to Singaporean living.",
  keywords: [
    "2F Resources",
    "Home renovation",
    "Singapore",
    "Interior design",
    "Renovation contractor",
  ],
  openGraph: {
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Transform your home with 2F Resources. We offer quality renovation services tailored to Singaporean living.",
    url: "https://2fresources.sg",
    siteName: "2F Resources",
    images: [
      {
        url: "https://2fresources.sg/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Transform your home with 2F Resources. We offer quality renovation services tailored to Singaporean living.",
    images: ["https://2fresources.sg/twitter-image.jpg"],
  },
  metadataBase: new URL("https://2fresources.com"),
  alternates: {
    canonical: "/",
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
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
