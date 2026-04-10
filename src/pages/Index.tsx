import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeatureGrid from "@/components/FeatureGrid";
import ProductShowcase from "@/components/ProductShowcase";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <AnnouncementBar />
    <HeroSection />
    <ProblemSection />
    <FeatureGrid />
    <ProductShowcase />
    <SocialProof />
    <PricingSection />
    <FaqSection />
    <FooterSection />
  </div>
);

export default Index;
