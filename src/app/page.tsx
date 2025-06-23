import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
// import TeamMembers from "@/components/TeamMembers";
import VideoSection from "@/components/VideoSection";
import Script from "next/script";
import { Project } from "@prisma/client";

export const metadata = {
  title: "2F Resources | Home Renovation Experts in Singapore",
  description:
    "Transform your home with 2F Resources – Singapore's trusted experts for full-home, kitchen, and bathroom renovations. Modern interior design. Transparent pricing. Quality guaranteed.",
  keywords: [
    "Home Renovation Singapore",
    "Renovation Contractor Singapore",
    "Interior Design Singapore",
    "Kitchen Remodeling Singapore",
    "Bathroom Renovation",
    "HDB Renovation",
    "2F Resources Reviews",
    "Singapore Renovation Experts",
    "Home Improvement Singapore",
  ],
  metadataBase: new URL("https://2fresources.com"),
  alternates: {
    canonical: "https://2fresources.com/",
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
      "Reliable renovation and remodeling specialists in Singapore. Let 2F Resources bring your dream home to life with modern designs and expert workmanship.",
    url: "https://2fresources.com/",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "2F Resources - Home Renovation Experts Singapore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Resources | Home Renovation Experts in Singapore",
    description:
      "Discover the art of home renovation with 2F Resources – trusted by homeowners across Singapore for quality and design.",
    images: ["https://2fresources.com/og-image.png"],
    creator: "@2fresources",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
  appleWebApp: {
    title: "2F Resources",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  category: "Home Renovation",
  authors: [{ name: "2F Resources", url: "https://2fresources.com" }],
  publisher: "2F Resources",
};

export function generateViewport() {
  return {
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#ffffff",
  };
}

async function fetchProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <>
      {/* ✅ WebSite Schema */}
      <Script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "2F Resources E&C Pte Ltd",
            alternateName: "2F Resources",
            url: "https://2fresources.com",
            logo: {
              "@type": "ImageObject",
              url: "https://2fresources.com/logo-512x512.png",
              width: 512,
              height: 512,
            },
          }),
        }}
      />

      {/* ✅ Organization Schema */}
      <Script
        id="jsonld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "2F Resources E&C Pte Ltd",
            alternateName: "2F Resources",
            url: "https://2fresources.com",
            logo: {
              "@type": "ImageObject",
              url: "https://2fresources.com/logo-512x512.png",
              width: 512,
              height: 512,
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+65 8202 3432",
              contactType: "Customer Service",
              areaServed: "SG",
              availableLanguage: ["English"],
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572212326307",
              "https://www.instagram.com/2f_resources",
            ],
          }),
        }}
      />

      {/* ✅ HomeAndConstructionBusiness Schema */}
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "2F Resources E&C Pte Ltd",
            url: "https://2fresources.com",
            logo: {
              "@type": "ImageObject",
              url: "https://2fresources.com/logo-512x512.png",
              width: 512,
              height: 512,
            },
            image: "https://2fresources.com/og-image.png",
            description:
              "2F Resources is a leading renovation contractor in Singapore, offering professional kitchen, bathroom, and full-home renovations with high-quality interior design services.",
            email: "project.sales@2fresources.com",
            telephone: "+65 8202 3432",
            address: {
              "@type": "PostalAddress",
              streetAddress: "51 Goldhill Plaza #07-07",
              addressLocality: "Singapore",
              postalCode: "308900",
              addressCountry: "SG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 1.320291,
              longitude: 103.841687,
            },
            hasMap:
              "https://www.google.com/maps/place/51+Goldhill+Plaza,+#07-07,+Singapore+308900",
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
            areaServed: {
              "@type": "Country",
              name: "Singapore",
            },
            priceRange: "$$",
          }),
        }}
      />
      <Carousel />
      <FactsSection />
      <AboutSection />
      <ServicesSection />
      <FeatureSection />
      <VideoSection />
      <ProjectsSection projects={projects} />
      {/* <TeamMembers /> */}
      {/* <Testimonials /> */}
    </>
  );
}
