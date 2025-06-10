import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";
import Script from "next/script";

export const metadata = {
  title: "Contact 2F Resources | Trusted Renovation Contractor in Singapore",
  description:
    "Get in touch with 2F Resources for professional home renovation services in Singapore. Contact us for consultations, quotes, or renovation inquiries.",
  keywords: [
    "Contact 2F Resources",
    "Renovation contractor Singapore",
    "Home renovation Singapore",
    "Get renovation quote Singapore",
    "Singapore interior design consultation",
    "HDB renovation contact",
  ],
  openGraph: {
    title:
      "Contact 2F Resources | Trusted Home Renovation Experts in Singapore",
    description:
      "Reach out to 2F Resources for renovation consultations, quotes, or inquiries. We provide expert home makeover services in Singapore.",
    url: "https://2fresources.com/contact",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact 2F Resources Home Renovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact 2F Resources | Renovation Experts Singapore",
    description:
      "Need help with your renovation? Contact 2F Resources for expert services across Singapore.",
    images: ["https://2fresources.com/og-image.png"],
    site: "@2f_resources",
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
            "@type": "WebPage",
            name: "Contact 2F Resources",
            url: "https://2fresources.com/contact",
            description:
              "Contact 2F Resources, a trusted renovation company in Singapore. Get in touch for home renovation quotes, consultations, and services.",
            mainEntity: {
              "@type": "Organization",
              name: "2F Resources",
              url: "https://2fresources.com",
              email: "project.sales@2fresources.com",
              telephone: "+65 8202 3432",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+65 8202 3432",
                email: "project.sales@2fresources.com",
                areaServed: "SG",
                availableLanguage: ["English", "Chinese"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Singapore",
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

      <PageHeader title="Contact Us" />
      <ContactSection />
    </>
  );
}
