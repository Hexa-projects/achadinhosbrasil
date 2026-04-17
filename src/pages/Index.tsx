import AnnouncementBar from "@/components/AnnouncementBar";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeatureGrid from "@/components/FeatureGrid";
import StickyModesSection from "@/components/StickyModesSection";
import SocialProof from "@/components/SocialProof";
import ComparisonTable from "@/components/ComparisonTable";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";
import MobileCTA from "@/components/MobileCTA";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground antialiased">
    <AnnouncementBar />
    <StickyHeader />
    <HeroSection />
    <ProblemSection />
    <FeatureGrid />
    <StickyModesSection />
    <SocialProof />
    <ComparisonTable />
    <PricingSection />
    <FaqSection />
    <FooterSection />
    <MobileCTA />
  </div>
);

export default Index;
