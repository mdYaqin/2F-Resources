import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import PageHeader from "@/components/PageHeader";

import Script from "next/script";

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
            url: "https://2fresources.com",
            logo: "https://2fresources.com/logo.svg",
            telephone: "+65 6123 4567",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Renovation Street",
              addressLocality: "Singapore",
              postalCode: "567890",
              addressCountry: "SG",
            },
            openingHours: "Mo-Sa 09:00-18:00",
            sameAs: [
              "https://facebook.com/2fresources",
              "https://instagram.com/2fresources",
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
