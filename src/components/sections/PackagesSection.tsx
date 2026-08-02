"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/ui/PackageCard";
import { PACKAGES } from "@/lib/constants";

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=40"
          alt="Background scenery"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/95" />
        <div className="absolute inset-0 bg-pattern opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tour Packages"
          title="AP Tourism Packages"
          subtitle="Choose from our carefully curated tour packages. Every package includes transport, meals, and unforgettable experiences."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PACKAGES.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              title={pkg.title}
              adultPrice={pkg.adultPrice}
              childPrice={pkg.childPrice}
              childAgeNote={pkg.childAgeNote}
              duration={pkg.duration}
              destination={pkg.destination}
              highlights={pkg.highlights}
              index={index}
              href={
                pkg.id === "papi-1day"
                  ? "/services/papikondalu"
                  : pkg.destination === "Maredumilli"
                    ? "/services/maredumilli"
                    : undefined
              }
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white/40 text-sm mt-10"
        >
          * Prices are subject to change. Contact us for the latest rates and
          custom packages.
        </motion.p>
      </div>
    </section>
  );
}
