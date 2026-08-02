import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HashScroll from "@/components/layout/HashScroll";
import TravelChatbot from "@/components/chat/TravelChatbot";
import HeroSection from "@/components/sections/HeroSection";
import AuthorityStrip from "@/components/sections/AuthorityStrip";
import ServicesSection from "@/components/sections/ServicesSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import PackagesSection from "@/components/sections/PackagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Navbar />
      <main>
        <HeroSection />
        <AuthorityStrip />
        <ServicesSection />
        <DestinationsSection />
        <PackagesSection />
        <TestimonialsSection />
        <FAQSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <TravelChatbot />
    </>
  );
}
