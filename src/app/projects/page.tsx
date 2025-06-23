import ProjectsSection from "@/components/ProjectsSection";
import PageHeader from "@/components/PageHeader";
import Script from "next/script";
import { Project } from "@prisma/client";

export const metadata = {
  title: "Home Renovation Projects in Singapore | 2F Resources Portfolio",
  description:
    "Discover quality home renovation projects by 2F Resources in Singapore. See real kitchen, bathroom, and interior makeovers.",
  keywords: [
    "Singapore renovation projects",
    "HDB renovation portfolio",
    "home makeover Singapore",
    "2F Resources renovation work",
    "interior design showcase Singapore",
    "kitchen and bathroom remodeling Singapore",
  ],
  openGraph: {
    title: "Home Renovation Projects | 2F Resources Singapore",
    description:
      "Explore 2F Resources’ completed home renovation projects across Singapore. View before-and-after examples of kitchens, bathrooms, and more.",
    url: "https://2fresources.com/projects",
    siteName: "2F Resources",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "https://2fresources.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Singapore Home Renovation Projects by 2F Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Resources | Singapore Home Renovation Portfolio",
    description:
      "Browse successful home renovation projects by 2F Resources, including kitchens, bathrooms, and full home transformations.",
    images: ["https://2fresources.com/og-image.png"],
    site: "@2f_resources",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
    return []; // fallback empty array
  }
}

export default async function Projects() {
  const projects = await fetchProjects();

  // Build JSON-LD from fetched projects
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "2F Resources Projects",
    description:
      "A showcase of renovation and interior design work by 2F Resources in Singapore.",
    url: "https://2fresources.com/projects",
    mainEntity: {
      "@type": "Organization",
      name: "2F Resources",
      url: "https://2fresources.com",
      email: "project.sales@2fresources.com",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61572212326307",
        "https://www.instagram.com/2f_resources",
      ],
    },
    hasPart: projects.map((project: Project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: `https://2fresources.com/projects/${project.id}`,
    })),
  };

  return (
    <>
      <Script
        id="jsonld-projects-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader title="Our Projects" />
      <ProjectsSection projects={projects} />
    </>
  );
}
