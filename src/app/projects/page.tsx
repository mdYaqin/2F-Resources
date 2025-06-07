import ProjectsSection from "@/components/ProjectsSection";
import PageHeader from "@/components/PageHeader";
import Script from "next/script";

export const metadata = {
  title: "Our Projects | 2F Resources Singapore Renovation Portfolio",
  description:
    "Explore completed home renovation projects by 2F Resources, showcasing quality craftsmanship across Singapore.",
  keywords: [
    "Home Renovation Projects",
    "2F Resources Portfolio",
    "Kitchen Remodeling Singapore",
    "Bathroom Renovation",
    "Home Makeover Examples",
  ],
  openGraph: {
    title: "Our Projects | 2F Resources Renovation Portfolio",
    description:
      "View our portfolio of successful home renovation projects throughout Singapore.",
    url: "https://www.2fresources.com/projects",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://www.2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "2F Resources Renovation Projects",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Projects() {
  return (
    <>
      <Script
        id="jsonld-projects-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "2F Resources Projects",
            description:
              "A showcase of renovation and interior design work by 2F Resources in Singapore.",
            url: "https://www.2fresources.com/projects",
            mainEntity: {
              "@type": "Organization",
              name: "2F Resources",
              url: "https://www.2fresources.com",
              email: "project.sales@2fresources.com",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61572212326307",
                "https://www.instagram.com/2f_resources",
              ],
            },
          }),
        }}
      />

      <PageHeader title="Our Projects" />
      <ProjectsSection />
    </>
  );
}
