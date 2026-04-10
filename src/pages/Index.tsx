import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProblemSection from "@/components/ProblemSection";
import FeatureGrid from "@/components/FeatureGrid";
import StickyModesSection from "@/components/StickyModesSection";
import ComparisonTable from "@/components/ComparisonTable";
import PortabilitySection from "@/components/PortabilitySection";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <AnnouncementBar />
    <HeroSection />
    <VideoSection />
    <ProblemSection />
    <FeatureGrid />
    <StickyModesSection />
    <ComparisonTable />
    <PortabilitySection />
    <SocialProof />
    <PricingSection />
    <FaqSection />
    <FooterSection />
  </div>
);

export default Index;
