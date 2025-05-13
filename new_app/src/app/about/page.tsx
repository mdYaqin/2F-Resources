import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamMembers from "@/components/TeamMembers";
import Testimonials from "@/components/Testimonials";
import PageHeader from "@/components/PageHeader";

export default function About() {
  return (
    <>
      <PageHeader title="About Us" />
      <AboutSection />
      <FeatureSection />
    </>
  );
}
