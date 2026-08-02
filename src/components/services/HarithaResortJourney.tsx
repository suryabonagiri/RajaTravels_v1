"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaHotel,
  FaUmbrellaBeach,
  FaMountain,
  FaTree,
  FaWater,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCheck,
  FaImage,
  FaChevronRight,
} from "react-icons/fa";
import type { HarithaResort } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";

function CategoryIcon({
  category,
  className,
}: {
  category: HarithaResort["category"];
  className?: string;
}) {
  if (category === "beach") return <FaUmbrellaBeach className={className} />;
  if (category === "hill") return <FaMountain className={className} />;
  if (category === "jungle") return <FaTree className={className} />;
  if (category === "island") return <FaWater className={className} />;
  return <FaHotel className={className} />;
}

function ResortDetailPanel({ resort }: { resort: HarithaResort }) {
  const inquireHref = generateWhatsAppLink(
    `Hi! I'd like to book *${resort.name}* (${resort.location}). Please share availability, room types, and APTDC / Haritha tariff guidance.`
  );

  return (
    <article className="rounded-2xl border border-[#0F766E]/12 bg-white overflow-hidden shadow-sm">
      <div className="relative aspect-[21/9] bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#14B8A6]">
        {resort.image ? (
          <Image
            src={resort.image}
            alt={resort.imageCaption || resort.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#E8C547] mb-3">
              <FaImage className="text-xl" />
            </div>
            <p className="text-white font-semibold text-sm md:text-base">
              {resort.shortName}
            </p>
            <p className="text-white/55 text-xs mt-1 max-w-md">
              {resort.imagePending
                ? "Photo slot reserved — APTDC stay image will appear here"
                : resort.imageCaption || "APTDC Haritha stay visual"}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#134E4A]/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#134E4A] bg-[#E8C547] px-2.5 py-1 rounded-full">
            {resort.categoryLabel}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-white/15 border border-white/20 px-2.5 py-1 rounded-full">
            APTDC Haritha
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] px-5 py-4 md:px-6">
        <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-white leading-snug">
          {resort.name}
        </h3>
        <p className="text-white/75 text-sm mt-2 flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#E8C547] shrink-0" />
          {resort.location}
        </p>
        <p className="text-white/80 text-sm mt-3 leading-relaxed">{resort.summary}</p>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {resort.images && resort.images.length > 1 ? (
          <div>
            <h4 className="text-sm font-bold text-[#134E4A] mb-3">Stay photos</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {resort.images.slice(0, 9).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#0F766E]/10 bg-[#F0FDFA]"
                >
                  <Image
                    src={src}
                    alt={`${resort.shortName} photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 220px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h4 className="text-sm font-bold text-[#134E4A] mb-3">Stay highlights</h4>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {resort.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-[#5F7A76]"
              >
                <FaCheck className="text-[#0F766E] mt-0.5 shrink-0 text-xs" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#134E4A] mb-3">Ideal for</h4>
          <div className="flex flex-wrap gap-2">
            {resort.idealFor.map((item) => (
              <span
                key={item}
                className="text-xs font-semibold text-[#0F766E] bg-[#ECFDF5] border border-[#0F766E]/15 px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {resort.notes && resort.notes.length > 0 ? (
          <div className="rounded-xl border border-[#C9A227]/25 bg-[#FEF9E7] px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#C9A227] font-semibold mb-2">
              Booking notes
            </p>
            <ul className="space-y-1.5">
              {resort.notes.map((note) => (
                <li key={note} className="text-sm text-[#5F7A76] leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <a
          href={inquireHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm"
        >
          <FaWhatsapp className="text-lg" />
          WhatsApp to check availability
        </a>
      </div>
    </article>
  );
}

function readInitialResortId(
  resorts: HarithaResort[],
  initialResortId?: string
) {
  if (initialResortId && resorts.some((r) => r.id === initialResortId)) {
    return initialResortId;
  }
  if (typeof window !== "undefined") {
    const hash = window.location.hash.replace("#resort-", "");
    if (hash && resorts.some((r) => r.id === hash)) return hash;
  }
  return null;
}

export default function HarithaResortJourney({
  resorts,
  initialResortId,
}: {
  resorts: HarithaResort[];
  initialResortId?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    readInitialResortId(resorts, initialResortId)
  );

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.replace("#resort-", "");
      if (next && resorts.some((r) => r.id === next)) {
        setSelectedId(next);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [resorts]);

  const selected = resorts.find((r) => r.id === selectedId) ?? null;

  const selectResort = (id: string) => {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    if (typeof window !== "undefined") {
      if (next) {
        window.history.replaceState(null, "", `#resort-${next}`);
        window.setTimeout(() => {
          document
            .getElementById("resort-detail-panel")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1FAE5] via-[#F0FDFA] to-[#F8FAF9]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,162,39,0.12),transparent_40%),radial-gradient(ellipse_at_80%_10%,rgba(20,184,166,0.14),transparent_42%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-[#C9A227] font-semibold tracking-[0.2em] text-xs uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <FaHotel className="text-sm" />
            APTDC Haritha properties
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#134E4A] mb-3">
            Choose a stay. Open the details.
          </h2>
          <p className="text-[#5F7A76] text-sm md:text-base leading-relaxed">
            Each box is a separate APTDC Haritha Hotel or Resort. Click any one
            to view stay details and enquire for availability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {resorts.map((resort, index) => {
            const isSelected = selectedId === resort.id;
            return (
              <motion.button
                key={resort.id}
                type="button"
                onClick={() => selectResort(resort.id)}
                aria-pressed={isSelected}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                className={`text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#0F766E] border-[#E8C547] text-white shadow-[0_12px_36px_rgba(15,118,110,0.28)]"
                    : "bg-white border-[#0F766E]/12 hover:border-[#C9A227]/55 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-[#E8C547] text-[#134E4A]"
                        : "bg-[#ECFDF5] text-[#0F766E]"
                    }`}
                  >
                    <CategoryIcon category={resort.category} className="text-lg" />
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-white/15 text-[#FEF6D8]"
                        : "bg-[#FEF6D8] text-[#C9A227]"
                    }`}
                  >
                    {resort.categoryLabel}
                  </span>
                </div>

                <h3
                  className={`font-[family-name:var(--font-heading)] text-xl leading-snug mb-2 ${
                    isSelected ? "text-white" : "text-[#134E4A]"
                  }`}
                >
                  {resort.shortName}
                </h3>
                <p
                  className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${
                    isSelected ? "text-[#CCFBF1]" : "text-[#0F766E]"
                  }`}
                >
                  <FaMapMarkerAlt className="text-[10px] shrink-0" />
                  {resort.location}
                </p>
                <p
                  className={`text-sm leading-relaxed line-clamp-3 ${
                    isSelected ? "text-white/80" : "text-[#5F7A76]"
                  }`}
                >
                  {resort.summary}
                </p>
                <p
                  className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${
                    isSelected ? "text-[#E8C547]" : "text-[#0F766E]"
                  }`}
                >
                  {isSelected ? "Selected — details below" : "View stay details"}
                  <FaChevronRight className="text-[10px]" />
                </p>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs md:text-sm text-[#5F7A76] max-w-2xl mx-auto leading-relaxed">
          Need another APTDC Haritha property (Kalahasti, Gandikota, Ahobilam,
          Lepakshi, and more)? Tell us the destination — we&apos;ll check
          availability.
        </p>

        <div
          id="resort-detail-panel"
          className="scroll-mt-28 mt-12 md:mt-14 pt-10 border-t border-[#0F766E]/15"
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-5 flex items-center gap-2 text-sm text-[#5F7A76]">
                  <FaHotel className="text-[#C9A227]" />
                  Selected stay — details & booking help
                </div>
                <ResortDetailPanel resort={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-[#5F7A76] text-sm py-6">
                Click any resort box above to open full stay details.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
