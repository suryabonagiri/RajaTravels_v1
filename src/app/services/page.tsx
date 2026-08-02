import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TravelChatbot from "@/components/chat/TravelChatbot";
import { getAllServices } from "@/lib/services";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Services | ${BUSINESS.name}`,
  description:
    "Explore Raja Travels services — premium bus rental, Papikondalu boat tourism, Maredumilli eco tours, Haritha resorts, group tours, and corporate trips.",
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 bg-gradient-to-br from-primary-dark via-primary to-[#071a38] overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Raja Travels
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-white mb-4 max-w-2xl">
              All services in one place
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Bus rental is part of our services — open any card below for full
              details, inclusions, and how to book.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white font-[family-name:var(--font-heading)] text-xl">
                    {service.title}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="text-sm font-semibold text-primary group-hover:text-gold transition-colors">
                    View full details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
      <TravelChatbot />
    </>
  );
}
