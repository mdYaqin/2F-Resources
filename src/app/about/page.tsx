import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import PageHeader from "@/components/PageHeader";
import Script from "next/script";

export const metadata = {
  title: "About 2F Resources | Trusted Home Renovation Contractor Singapore",
  description:
    "Discover the story of 2F Resources, Singapore’s trusted home renovation contractor. Meet our team and learn about our mission, values, and services.",
  keywords: [
    "About 2F Resources",
    "Home Renovation Singapore",
    "Interior Design Experts Singapore",
    "Renovation Contractor Singapore",
    "2F Resources Team",
    "Home Makeover Professionals",
  ],
  openGraph: {
    title: "About 2F Resources | Reliable Renovation Experts Singapore",
    description:
      "Learn about 2F Resources and our dedicated team of renovation specialists helping transform homes across Singapore.",
    url: "https://2fresources.com/about",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meet 2F Resources Renovation Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About 2F Resources | Trusted Home Renovation Contractor Singapore",
    description:
      "Get to know 2F Resources — Singapore’s renovation experts delivering quality home makeovers. Learn about our values, team, and mission.",
    images: ["https://2fresources.com/og-image.png"],
    site: "@2f_resources",
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
        id="jsonld-about-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "2F Resources",
            url: "https://2fresources.com",
            description:
              "2F Resources is a trusted renovation contractor in Singapore, providing expert home makeover services for HDBs, condos, and landed properties.",
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
            priceRange: "$$",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              telephone: "+65 8202 3432",
              email: "project.sales@2fresources.com",
              areaServed: "SG",
              availableLanguage: ["English", "Chinese"],
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572212326307",
              "https://www.instagram.com/2f_resources",
            ],
          }),
        }}
      />

      <PageHeader title="About Us" />
      <AboutSection />
      <FeatureSection />
    </>
  );
}
