import PageHeader from "@/components/PageHeader";
import AppointmentSection from "@/components/AppointmentSection";
import Script from "next/script";

export const metadata = {
  title: "Set Appointment | 2F Resources Renovation Consultation Singapore",
  description:
    "Book an appointment with 2F Resources for personalized home renovation consultation and planning in Singapore.",
  keywords: [
    "Renovation Appointment",
    "Book Renovation Consultation",
    "2F Resources Appointment",
    "Singapore Home Renovation Booking",
  ],
  openGraph: {
    title: "Set Appointment | 2F Resources Renovation Consultation",
    description:
      "Schedule your consultation with Singapore’s trusted home renovation experts at 2F Resources.",
    url: "https://www.2fresources.com/appointment",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "2F Resources Appointment",
      },
    ],
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
        id="jsonld-appointment-page
"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Renovation Consultation",
            provider: {
              "@type": "LocalBusiness",
              name: "2F Resources",
              url: "https://www.2fresources.com",
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
