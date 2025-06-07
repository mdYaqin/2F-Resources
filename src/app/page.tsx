import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
// import TeamMembers from "@/components/TeamMembers";
import VideoSection from "@/components/VideoSection";
import Script from "next/script";

export const metadata = {
  title: "2F Resources | Home Renovation Experts in Singapore",
  description:
    "Transform your home with 2F Resources – the trusted name in Singapore for kitchen, bathroom, and full-home renovations.",
  keywords: [
    "Home Renovation Singapore",
    "Renovation Contractor",
    "Interior Design Singapore",
    "Bathroom Renovation",
    "Kitchen Remodeling",
    "HDB Renovation",
    "2F Resources",
  ],
  metadataBase: new URL("https://www.2fresources.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Reliable renovation and remodeling specialists in Singapore. Let 2F Resources bring your dream home to life.",
    url: "https://www.2fresources.com/",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "2F Resources - Singapore Home Renovation Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Discover the art of home renovation with 2F Resources – trusted by homeowners across Singapore.",
    images: ["https://www.2fresources.com/og-image.png"],
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
  category: "Home Renovation",
};

export default function Home() {
  return (
    <>
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "2F Resources",
            description:
              "2F Resources is a trusted renovation contractor in Singapore offering full-home, kitchen, and bathroom renovations with modern interior design solutions.",
            url: "https://www.2fresources.com",
            logo: "https://www.2fresources.com/logo.svg",
            email: "info@2fresources.com",
            telephone: "+65 8202 3432",
            image: "https://www.2fresources.com/og-image.png",
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

      <Carousel />
      <FactsSection />
      <AboutSection />
      <ServicesSection />
      <FeatureSection />
      <VideoSection />
      <ProjectsSection />
      {/* <TeamMembers /> */}
      {/* <Testimonials /> */}
    </>
  );
}
