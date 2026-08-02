"use client";

import Image from "next/image";
import {
  FaClock,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaUtensils,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import type { TourPackage } from "@/lib/constants";
import { generateWhatsAppLink, formatPackageInquiry } from "@/lib/utils";

export default function PackageDetailBlock({ pkg }: { pkg: TourPackage }) {
  const inquireHref = generateWhatsAppLink(formatPackageInquiry(pkg.title));
  const hasChildPrice = pkg.childPrice && pkg.childPrice !== "—";

  return (
    <article
      id={`package-${pkg.id}`}
      className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm"
    >
      {/* Image slot — real photo or reserved placeholder for later upload */}
      <div className="relative aspect-[21/9] bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        {pkg.image ? (
          <Image
            src={pkg.image}
            alt={pkg.imageCaption || pkg.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gold mb-3">
              <FaImage className="text-xl" />
            </div>
            <p className="text-white font-semibold text-sm md:text-base">
              {pkg.shortTitle || pkg.title}
            </p>
            <p className="text-white/55 text-xs mt-1 max-w-md">
              {pkg.imagePending
                ? "Photo slot reserved — package image will appear here"
                : pkg.imageCaption || "Package visual"}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-dark bg-gold px-2.5 py-1 rounded-full">
            <FaClock className="text-[9px]" />
            {pkg.duration}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-white/15 border border-white/20 px-2.5 py-1 rounded-full">
            {pkg.destination}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary-light px-5 py-4 md:px-6">
        <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white leading-snug">
          {pkg.title}
        </h3>
        {pkg.summary ? (
          <p className="text-white/70 text-sm mt-2 leading-relaxed">{pkg.summary}</p>
        ) : null}
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {pkg.images && pkg.images.length > 1 ? (
          <div>
            <h4 className="text-sm font-bold text-primary mb-3">Package photos</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {pkg.images.slice(0, 9).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 bg-surface"
                >
                  <Image
                    src={src}
                    alt={`${pkg.shortTitle || pkg.title} photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 220px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {(pkg.reportingPlace || pkg.reportingTime) && (
          <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold mb-1">
              Reporting
            </p>
            <p className="text-sm text-primary font-semibold">
              {pkg.reportingTime ? `${pkg.reportingTime}` : ""}
              {pkg.reportingTime && pkg.reportingPlace ? " · " : ""}
              {pkg.reportingPlace}
            </p>
          </div>
        )}

        {pkg.pricingOptions && pkg.pricingOptions.length > 0 ? (
          <div>
            <h4 className="text-sm font-bold text-primary mb-3">Pricing options</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {pkg.pricingOptions.map((option) => (
                <div
                  key={option.label}
                  className="rounded-xl border border-gray-100 bg-surface px-4 py-3"
                >
                  <p className="text-xs font-semibold text-primary mb-2">
                    {option.label}
                  </p>
                  <p className="text-lg font-bold text-gold-dark">
                    Adult {option.adultPrice}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    Child {option.childPrice}
                    {option.childAgeNote ? ` (${option.childAgeNote})` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : pkg.roomRates && pkg.roomRates.length > 0 ? (
          <div>
            <h4 className="text-sm font-bold text-primary mb-3">Available rooms</h4>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold text-primary">Room</th>
                    <th className="px-4 py-2.5 font-semibold text-primary">Weekday</th>
                    <th className="px-4 py-2.5 font-semibold text-primary">Weekend</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.roomRates.map((room) => (
                    <tr key={room.label} className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-text-secondary">{room.label}</td>
                      <td className="px-4 py-2.5 font-semibold text-primary">
                        {room.weekday}
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-primary">
                        {room.weekend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={`grid gap-3 ${hasChildPrice ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="rounded-xl bg-gold/5 border border-gold/20 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold mb-1">
                Adult
              </p>
              <p className="text-2xl font-bold text-primary">{pkg.adultPrice}</p>
            </div>
            {hasChildPrice ? (
              <div className="rounded-xl bg-surface border border-gray-100 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-1">
                  Child{pkg.childAgeNote ? ` (${pkg.childAgeNote})` : ""}
                </p>
                <p className="text-2xl font-bold text-primary">{pkg.childPrice}</p>
              </div>
            ) : null}
          </div>
        )}

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

        {pkg.facilities && pkg.facilities.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <FaUtensils className="text-gold text-xs" />
              Package facilities
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {pkg.facilities.map((item) => (
                <li
                  key={item}
                  className="text-sm text-text-secondary flex items-start gap-2"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {pkg.daySchedules && pkg.daySchedules.length > 0 ? (
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-primary">Tour schedule</h4>
            {pkg.daySchedules.map((day) => (
              <div key={day.dayLabel}>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-3">
                  {day.dayLabel}
                </p>
                <ol className="relative border-l border-gold/35 ml-2 space-y-4">
                  {day.stops.map((stop) => (
                    <li
                      key={`${day.dayLabel}-${stop.time}-${stop.detail}`}
                      className="pl-5 relative"
                    >
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
            ))}
          </div>
        ) : pkg.itinerary && pkg.itinerary.length > 0 ? (
          <div>
            <h4 className="text-sm font-bold text-primary mb-4">Tour information</h4>
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
        ) : pkg.highlights.length > 0 ? (
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
        ) : null}

        {pkg.notes && pkg.notes.length > 0 && (
          <div className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
            <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
              <FaInfoCircle className="text-gold" />
              Extra notes
            </p>
            <ul className="space-y-1.5">
              {pkg.notes.map((note) => (
                <li key={note} className="text-sm text-text-secondary">
                  {note}
                </li>
              ))}
            </ul>
          </div>
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
