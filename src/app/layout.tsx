import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "./globals.css";

import { Open_Sans, Teko } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://2fresources.com"),
  title: "2F Resources | Home Renovation Experts in Singapore",
  description:
    "2F Resources is Singapore's trusted renovation contractor for kitchen, bathroom, and full-home renovations.",
  keywords: [
    "Home Renovation Singapore",
    "Renovation Contractor",
    "Interior Design Singapore",
    "Bathroom Renovation",
    "Kitchen Remodeling",
    "HDB Renovation",
    "2F Resources",
  ],
  openGraph: {
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Transform your home with professional renovation services by 2F Resources.",
    url: "https://2fresources.com/",
    siteName: "2F Resources",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "2F Resources - Home Renovation Singapore",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Discover trusted home renovation and interior design solutions with 2F Resources.",
    images: ["https://2fresources.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "2F Resources",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "Home Renovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for better font performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* PWA & theme */}
        <meta name="apple-mobile-web-app-title" content="2F Resources" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#232121" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        className={`${openSans.variable} ${teko.variable} d-flex flex-column min-vh-100`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>

        {/* Structured Data for the business */}
        <Script
          id="jsonld-global"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "2F Resources",
              description:
                "2F Resources is a trusted renovation contractor in Singapore offering full-home, kitchen, and bathroom renovations with modern interior design solutions.",
              url: "https://2fresources.com",
              logo: "https://2fresources.com/logo.svg",
              email: "project.sales@2fresources.com",
              telephone: "+65 8202 3432",
              image: "https://2fresources.com/og-image.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "51 Goldhill Plaza #07-07",
                addressLocality: "Singapore",
                postalCode: "308900",
                addressCountry: "SG",
              },
              hasMap:
                "https://www.google.com/maps/place/51+Goldhill+Plaza,+#07-07,+Singapore+308900",
              openingHours: "Mo-Sa 09:00-18:00",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61572212326307",
                "https://www.instagram.com/2f_resources",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
