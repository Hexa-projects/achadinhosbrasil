import { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import MagneticDesignSection from "@/components/MagneticDesignSection";
import ProblemSection from "@/components/ProblemSection";

import StickyModesSection from "@/components/StickyModesSection";
import SocialProof from "@/components/SocialProof";
import ComparisonTable from "@/components/ComparisonTable";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";
import MobileCTA from "@/components/MobileCTA";
import { initPixel } from "@/lib/pixel";

const Index = () => {
  useEffect(() => {
    initPixel();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <AnnouncementBar />
      <StickyHeader />
      <HeroSection />
      <VideoSection />
      <MagneticDesignSection />
      <ProblemSection />

      <StickyModesSection />
      <SocialProof />
      <ComparisonTable />
      <PricingSection />
      <FaqSection />
      <FooterSection />
      <MobileCTA />
    </div>
  );
};

export default Index;

