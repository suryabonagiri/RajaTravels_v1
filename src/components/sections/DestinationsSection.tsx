"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/ui/DestinationCard";
import { DESTINATIONS } from "@/lib/constants";

export default function DestinationsSection() {
  return (
    <section id="destinations" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Explore"
          title="Popular Destinations"
          subtitle="Discover the hidden gems of Andhra Pradesh. From river cruises to forest adventures, every destination is a journey worth taking."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DESTINATIONS.map((dest, index) => (
            <DestinationCard
              key={dest.id}
              title={dest.title}
              subtitle={dest.subtitle}
              description={dest.description}
              image={dest.image}
              highlights={dest.highlights}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
