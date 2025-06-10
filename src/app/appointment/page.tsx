import PageHeader from "@/components/PageHeader";
import AppointmentSection from "@/components/AppointmentSection";
import Script from "next/script";

export const metadata = {
  title: "Set Appointment | Renovation Consultation by 2F Resources Singapore",
  description:
    "Schedule an appointment with 2F Resources for personalized renovation consultation in Singapore. Let us help you plan your dream home transformation.",
  keywords: [
    "Renovation Appointment Singapore",
    "Book Renovation Consultation",
    "Home Renovation Booking",
    "2F Resources Consultation",
    "Interior Design Consultation Singapore",
    "HDB Renovation Appointment",
  ],
  openGraph: {
    title: "Book a Renovation Consultation | 2F Resources Singapore",
    description:
      "Set an appointment with our expert renovation team. Consultations available for HDB, condo, and landed property projects in Singapore.",
    url: "https://2fresources.com/appointment",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Book Renovation Appointment with 2F Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an Appointment | 2F Resources Renovation Consultation",
    description:
      "Book a free consultation with 2F Resources for your renovation project in Singapore. Trusted contractor for HDB, condo, and landed homes.",
    images: ["https://2fresources.com/og-image.png"],
    site: "@2f_resources",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Appointment() {
  return (
    <>
      <Script
        id="jsonld-appointment-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Home Renovation Consultation",
            areaServed: "SG",
            availableLanguage: ["English", "Chinese"],
            provider: {
              "@type": "LocalBusiness",
              name: "2F Resources",
              url: "https://2fresources.com",
              telephone: "+65 8202 3432",
              email: "project.sales@2fresources.com",
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

      <PageHeader title="Appointment" />
      <AppointmentSection />
    </>
  );
}
