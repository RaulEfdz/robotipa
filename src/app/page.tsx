import SolutionsShowcase from "@/components/solutions/SolutionsShowcase";
import SectionWrapper from "@/components/common/SectionWrapper";
import { homepageContent } from "@/lib/data/homepageContent";
import HeroSection from "@/components/common/HeroSection";
import PricingSection from "@/components/common/PricingSection";
import Testimonials from "@/components/common/Testimonials";
import FAQSection from "@/components/common/FAQSection";
import ContactSection from "@/components/common/ContactSection";
import ServicesSection from "@/components/common/ServicesSection";
import ResourcesSection from "@/components/common/ResourcesSection";
import SuccessCasesSection from "@/components/common/SuccessCasesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionWrapper id="servicios">
        <ServicesSection />
      </SectionWrapper>
      <SectionWrapper id="recursos">
        <ResourcesSection />
      </SectionWrapper>
      <SectionWrapper id="casos">
        <SuccessCasesSection />
      </SectionWrapper>
      <SectionWrapper id="soluciones">
        <SolutionsShowcase />
      </SectionWrapper>
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <SectionWrapper id="contacto">
        <ContactSection />
      </SectionWrapper>
    </>
  );
}
