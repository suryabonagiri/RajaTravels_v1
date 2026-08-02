import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroSection from "@/components/sections/HeroSection";
import IntroStrip from "@/components/sections/IntroStrip";
import RoadJourneySection from "@/components/sections/RoadJourneySection";
import DestinationStorySection from "@/components/sections/DestinationStorySection";
import PackagesSection from "@/components/sections/PackagesSection";
import BusRentalSection from "@/components/sections/BusRentalSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <IntroStrip />
        <RoadJourneySection />
        <DestinationStorySection />
        <PackagesSection />
        <BusRentalSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
