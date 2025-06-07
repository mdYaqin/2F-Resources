import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";

import Script from "next/script";

export const metadata = {
  title: "Contact 2F Resources | Get in Touch for Home Renovation in Singapore",
  description:
    "Contact 2F Resources for inquiries, quotes, and consultations on your home renovation projects in Singapore.",
  keywords: [
    "Contact 2F Resources",
    "Home Renovation Inquiry",
    "Renovation Quote Singapore",
    "Singapore Renovation Contractor Contact",
  ],
  openGraph: {
    title: "Contact 2F Resources | Home Renovation Experts Singapore",
    description:
      "Reach out to 2F Resources for expert home renovation services and advice.",
    url: "https://www.2fresources.com/contact",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact 2F Resources",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return (
    <>
      <Script
        id="jsonld-contact-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "Organization",
              name: "2F Resources",
              url: "https://www.2fresources.com",
              email: "project.sales@2fresources.com",
              telephone: "+65 8202 3432",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61572212326307",
                "https://www.instagram.com/2f_resources",
              ],
            },
          }),
        }}
      />

      <PageHeader title="Contact Us" />
      <ContactSection />
    </>
  );
}
