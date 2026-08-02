"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-surface relative">
      <div className="absolute inset-0 bg-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Offer"
          title="Our Premium Services"
          subtitle="From luxury bus rentals to breathtaking tourism packages, we deliver excellence in every journey across Andhra Pradesh. Tap a service to see full details."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors"
          >
            Browse all services
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}
