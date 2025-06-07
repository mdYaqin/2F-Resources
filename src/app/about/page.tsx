import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import PageHeader from "@/components/PageHeader";

import Script from "next/script";

export const metadata = {
  title: "About 2F Resources | Trusted Home Renovation Experts in Singapore",
  description:
    "Learn about 2F Resources, our mission, team, and commitment to quality home renovation in Singapore.",
  keywords: [
    "About 2F Resources",
    "Home Renovation Singapore",
    "Renovation Experts",
    "Interior Design",
    "Trusted Renovation Contractor",
  ],
  openGraph: {
    title: "About 2F Resources | Trusted Home Renovation Experts",
    description:
      "Meet our team and discover why 2F Resources is your reliable partner for home makeovers.",
    url: "https://www.2fresources.com/about",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About 2F Resources",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function About() {
  return (
    <>
      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "2F Resources",
            url: "https://2fresources.com/about",
            logo: "https://2fresources.com/logo.svg",
            telephone: "+65 8202 3432",
            email: "project.sales@2fresources.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "51 Goldhill Plaza #07-07",
              addressLocality: "Singapore",
              postalCode: "308900",
              addressCountry: "SG",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572212326307",
              "https://www.instagram.com/2f_resources",
            ],
            priceRange: "$$", // Optional: gives an idea of pricing level
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+65 8202 3432",
              email: "project.sales@2fresources.com",
              contactType: "customer service",
              areaServed: "SG",
            },
          }),
        }}
      />

      <PageHeader title="About Us" />
      <AboutSection />
      <FeatureSection />
    </>
  );
}
