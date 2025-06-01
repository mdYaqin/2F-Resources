import AboutSection from "@/components/AboutSection";
import Carousel from "@/components/Carousel";
import FactsSection from "@/components/FactsSection";
import ServicesSection from "@/components/ServicesSection";
import FeatureSection from "@/components/FeatureSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamMembers from "@/components/TeamMembers";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <>
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
