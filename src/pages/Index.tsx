import AnnouncementBar from "@/components/AnnouncementBar";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import VideoSection from "@/components/VideoSection";
import ProblemSection from "@/components/ProblemSection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import UseCasesSection from "@/components/UseCasesSection";
import FeatureGrid from "@/components/FeatureGrid";
import StickyModesSection from "@/components/StickyModesSection";
import PortabilitySection from "@/components/PortabilitySection";
import ComparisonTable from "@/components/ComparisonTable";
import SpecsSection from "@/components/SpecsSection";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";
import MobileCTA from "@/components/MobileCTA";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <AnnouncementBar />
    <StickyHeader />
    <HeroSection />
    <ProductShowcase />
    <ProblemSection />
    <DifferentiatorsSection />
    <VideoSection />
    <FeatureGrid />
    <UseCasesSection />
    <StickyModesSection />
    <PortabilitySection />
    <ComparisonTable />
    <SpecsSection />
    <SocialProof />
    <PricingSection />
    <FaqSection />
    <FooterSection />
    <MobileCTA />
  </div>
);

export default Index;
