import PageHeader from "@/components/PageHeader";
import ThemeSection from "@/components/ThemeSection";
import Script from "next/script";

export const metadata = {
  title: "Renovation Themes | Interior Design Styles by 2F Resources Singapore",
  description:
    "Explore unique renovation themes and interior design styles by 2F Resources. Get inspired by our curated collection tailored for Singapore homes.",
  keywords: [
    "Renovation Themes",
    "Interior Design Styles",
    "Singapore Home Interiors",
    "Modern Renovation Ideas",
    "2F Resources Design",
    "Theme Gallery",
  ],
  openGraph: {
    title: "Renovation Themes | 2F Resources Interior Design Inspiration",
    description:
      "Browse our renovation themes to find inspiration for your next home makeover. 2F Resources offers modern and classic styles perfect for Singapore homes.",
    url: "https://www.2fresources.com/theme",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Renovation Themes by 2F Resources",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Theme() {
  return (
    <>
      <Script
        id="jsonld-theme-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Renovation Themes",
            url: "https://www.2fresources.com/theme",
            description:
              "Explore curated renovation themes and interior design inspirations for modern Singapore homes, created by 2F Resources.",
            mainEntity: {
              "@type": "Organization",
              name: "2F Resources",
              url: "https://www.2fresources.com",
              logo: "https://www.2fresources.com/logo.svg",
              email: "project.sales@2fresources.com",
              telephone: "+65 8202 3432",
              address: {
                "@type": "PostalAddress",
                streetAddress: "51 Goldhill Plaza #07-07",
                addressLocality: "Singapore",
                postalCode: "308900",
                addressCountry: "SG",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61572212326307",
                "https://www.instagram.com/2f_resources",
              ],
            },
          }),
        }}
      />
      <PageHeader title="Our Theme" />
      <ThemeSection />
    </>
  );
}
