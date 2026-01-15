import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { VisionMission } from "@/components/home/VisionMission";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { QuickLinks } from "@/components/home/QuickLinks";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <VisionMission />
      <HighlightsSection />
      <QuickLinks />
    </Layout>
  );
};

export default Index;
