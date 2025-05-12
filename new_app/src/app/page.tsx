import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamMembers from "@/components/TeamMembers";

export default function Home() {
  return (
    <>
      <Carousel />
      <FactsSection />
      <AboutSection />
      <ServicesSection />
      <FeatureSection />
      <ProjectsSection />
      <TeamMembers />
    </>
  );
}
