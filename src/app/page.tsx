import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TravelChatbot from "@/components/chat/TravelChatbot";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
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
        <AboutSection />
        <ServicesSection />
        <DestinationsSection />
        <PackagesSection />
        <BusRentalSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <TravelChatbot />
    </>
  );
}
