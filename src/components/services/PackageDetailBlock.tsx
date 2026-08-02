"use client";

import { FaClock, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import type { TourPackage } from "@/lib/constants";
import { generateWhatsAppLink, formatPackageInquiry } from "@/lib/utils";

export default function PackageDetailBlock({ pkg }: { pkg: TourPackage }) {
  const inquireHref = generateWhatsAppLink(formatPackageInquiry(pkg.title));

  return (
    <article className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary-light px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-center gap-2 text-gold/90 text-xs font-semibold tracking-wide uppercase mb-2">
          <FaClock className="text-[10px]" />
          {pkg.duration} · {pkg.destination}
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white leading-snug">
          {pkg.title}
        </h3>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gold/5 border border-gold/20 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold mb-1">
              Adult
            </p>
            <p className="text-2xl font-bold text-primary">{pkg.adultPrice}</p>
          </div>
          <div className="rounded-xl bg-surface border border-gray-100 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-1">
              Child{pkg.childAgeNote ? ` (${pkg.childAgeNote})` : ""}
            </p>
            <p className="text-2xl font-bold text-primary">{pkg.childPrice}</p>
          </div>
        </div>

        {pkg.visitingPlaces && pkg.visitingPlaces.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <FaMapMarkerAlt className="text-gold text-xs" />
              Visiting places
            </h4>
            <ul className="flex flex-wrap gap-2">
              {pkg.visitingPlaces.map((place) => (
                <li
                  key={place}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10"
                >
                  {place}
                </li>
              ))}
            </ul>
          </div>
        )}

        {pkg.itinerary && pkg.itinerary.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-primary mb-4">
              Tour information
            </h4>
            <ol className="relative border-l border-gold/35 ml-2 space-y-4">
              {pkg.itinerary.map((stop) => (
                <li key={`${stop.time}-${stop.detail}`} className="pl-5 relative">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold border-2 border-white shadow" />
                  <p className="text-xs font-bold text-gold-dark tracking-wide uppercase mb-1">
                    {stop.time}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {stop.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {!pkg.itinerary && pkg.highlights.length > 0 && (
          <ul className="space-y-2">
            {pkg.highlights.map((item) => (
              <li
                key={item}
                className="text-sm text-text-secondary flex items-start gap-2"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <a
          href={inquireHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm font-semibold text-primary-dark bg-gold hover:bg-gold-light px-5 py-2.5 rounded-lg transition-colors"
        >
          <FaWhatsapp />
          Inquire on WhatsApp
        </a>
      </div>
    </article>
  );
}
