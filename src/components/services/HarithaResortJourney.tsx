"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaHotel,
  FaChevronDown,
  FaUmbrellaBeach,
  FaMountain,
  FaTree,
  FaWater,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCheck,
  FaImage,
} from "react-icons/fa";
import type { HarithaResort } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";

function categoryIcon(category: HarithaResort["category"]) {
  switch (category) {
    case "beach":
      return FaUmbrellaBeach;
    case "hill":
      return FaMountain;
    case "jungle":
      return FaTree;
    case "island":
      return FaWater;
    default:
      return FaHotel;
  }
}

function ResortStopCard({
  resort,
  index,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onSelect,
  align = "left",
}: {
  resort: HarithaResort;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  align?: "left" | "right";
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`relative z-10 w-full text-left rounded-2xl border px-4 py-4 md:px-5 md:py-5 transition-all duration-300 cursor-pointer ${
        align === "right" ? "md:text-right" : ""
      } ${
        isSelected
          ? "bg-[#0F766E] text-white border-[#E8C547] shadow-[0_12px_40px_rgba(15,118,110,0.3)] scale-[1.02]"
          : isHovered
            ? "bg-white border-[#C9A227] shadow-[0_12px_32px_rgba(201,162,39,0.28)] scale-[1.03]"
            : "bg-white/95 border-[#0F766E]/12 shadow-md hover:border-[#C9A227]/50"
      }`}
      whileTap={{ scale: 0.985 }}
    >
      <div
        className={`flex items-start gap-3 ${
          align === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <span
          className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
            isSelected
              ? "bg-[#E8C547] text-[#134E4A]"
              : isHovered
                ? "bg-[#FEF6D8] text-[#0F766E]"
                : "bg-[#ECFDF5] text-[#0F766E]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[10px] uppercase tracking-[0.16em] font-semibold mb-1 ${
              isSelected ? "text-[#FEF6D8]" : "text-[#C9A227]"
            }`}
          >
            {resort.categoryLabel} · {resort.location}
          </p>
          <p
            className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-snug ${
              isSelected ? "text-white" : "text-[#134E4A]"
            }`}
          >
            {resort.shortName}
          </p>
          <p
            className={`text-sm mt-2 leading-relaxed ${
              isSelected ? "text-white/85" : "text-[#5F7A76]"
            }`}
          >
            {resort.summary}
          </p>
          <p
            className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${
              align === "right" ? "md:flex-row-reverse" : ""
            } ${isSelected ? "text-[#FEF6D8]" : "text-[#0F766E]"}`}
          >
            {isSelected ? "Open below — stay details" : "Click to open stay details"}
            <FaChevronDown
              className={`text-[10px] transition-transform ${
                isSelected ? "rotate-180" : ""
              }`}
            />
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function StayMarker({
  active,
  category,
  size = "md",
}: {
  active: boolean;
  category: HarithaResort["category"];
  size?: "sm" | "md";
}) {
  const Icon = categoryIcon(category);
  const box = size === "sm" ? "h-8 w-8 border-2" : "h-10 w-10 border-[3px]";
  const icon = size === "sm" ? "text-[11px]" : "text-sm";
  return (
    <span
      className={`relative z-20 flex items-center justify-center rounded-full transition-all duration-300 ${box} ${
        active
          ? "bg-[#E8C547] border-white scale-110 shadow-[0_0_22px_rgba(232,197,71,0.85)]"
          : "bg-[#F0FDFA] border-[#0F766E]/25 shadow-md"
      }`}
    >
      <Icon
        className={`${icon} ${active ? "text-[#134E4A]" : "text-[#0F766E]/70"}`}
      />
    </span>
  );
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
  return resorts[0]?.id ?? null;
}

export default function HarithaResortJourney({
  resorts,
  initialResortId,
}: {
  resorts: HarithaResort[];
  initialResortId?: string;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#resort-${id}`);
      window.setTimeout(() => {
        document
          .getElementById("resort-detail-panel")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D1FAE5] via-[#F0FDFA] to-[#F8FAF9]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_5%,rgba(201,162,39,0.18),transparent_42%),radial-gradient(ellipse_at_85%_20%,rgba(20,184,166,0.2),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(15,118,110,0.1),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[#C9A227] font-semibold tracking-[0.2em] text-xs uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <FaHotel className="text-sm" />
            APTDC Haritha stay map
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#134E4A] mb-3">
            Explore stays. Book the right Haritha property.
          </h2>
          <p className="text-[#5F7A76] text-sm md:text-base leading-relaxed">
            Hover a stop to highlight it. Click any APTDC Haritha Hotel or Resort
            to open stay details — beaches, hills, jungle cottages, islands, and
            temple-town hotels.
          </p>
        </div>

        <div className="hidden md:block relative">
          <svg
            className="pointer-events-none absolute inset-y-4 left-1/2 z-0 h-[calc(100%-2rem)] w-[120px] -translate-x-1/2"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="harithaPathFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.65" />
                <stop offset="40%" stopColor="#0F766E" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#C9A227" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#E8C547" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <path
              d="M 60 0
                 C 88 70, 98 130, 60 200
                 C 20 280, 12 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 18 760, 22 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="#D1FAE5"
              strokeWidth="40"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            <path
              d="M 60 0
                 C 88 70, 98 130, 60 200
                 C 20 280, 12 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 18 760, 22 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="url(#harithaPathFill)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 60 0
                 C 88 70, 98 130, 60 200
                 C 20 280, 12 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 18 760, 22 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeOpacity="0.9"
            />
          </svg>

          <ol className="relative z-10 space-y-10 lg:space-y-12">
            {resorts.map((resort, index) => {
              const isLeft = index % 2 === 0;
              const isSelected = selectedId === resort.id;
              const isHovered = hoveredId === resort.id;
              const isActive = isSelected || isHovered;

              return (
                <li
                  key={resort.id}
                  className="grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] items-center gap-x-3 lg:gap-x-5"
                >
                  <div className={isLeft ? "justify-self-end w-full max-w-md" : ""}>
                    {isLeft ? (
                      <ResortStopCard
                        resort={resort}
                        index={index}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        align="right"
                        onHover={() => setHoveredId(resort.id)}
                        onLeave={() => setHoveredId(null)}
                        onSelect={() => selectResort(resort.id)}
                      />
                    ) : null}
                  </div>

                  <div className="flex justify-center">
                    <StayMarker active={isActive} category={resort.category} />
                  </div>

                  <div className={!isLeft ? "justify-self-start w-full max-w-md" : ""}>
                    {!isLeft ? (
                      <ResortStopCard
                        resort={resort}
                        index={index}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        align="left"
                        onHover={() => setHoveredId(resort.id)}
                        onLeave={() => setHoveredId(null)}
                        onSelect={() => selectResort(resort.id)}
                      />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="md:hidden relative pl-11">
          <div className="absolute left-4 top-3 bottom-3 w-2.5 rounded-full bg-gradient-to-b from-[#14B8A6] via-[#0F766E] to-[#C9A227] overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.4)_10px,rgba(255,255,255,0.4)_14px)]" />
          </div>

          <div className="space-y-5">
            {resorts.map((resort, index) => {
              const isSelected = selectedId === resort.id;
              const isHovered = hoveredId === resort.id;
              return (
                <div key={resort.id} className="relative">
                  <span className="absolute -left-[2.05rem] top-5 z-10">
                    <StayMarker
                      size="sm"
                      active={isSelected || isHovered}
                      category={resort.category}
                    />
                  </span>
                  <ResortStopCard
                    resort={resort}
                    index={index}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    onHover={() => setHoveredId(resort.id)}
                    onLeave={() => setHoveredId(null)}
                    onSelect={() => selectResort(resort.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-xs md:text-sm text-[#5F7A76] max-w-2xl mx-auto leading-relaxed">
          Showing popular APTDC Haritha Hotels & Resorts. Need another property
          (Kalahasti, Gandikota, Ahobilam, Lepakshi, and more)? Tell us the
          destination — we&apos;ll check availability.
        </p>

        <div
          id="resort-detail-panel"
          className="scroll-mt-28 mt-12 md:mt-16 pt-10 md:pt-12 border-t border-[#0F766E]/15"
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-5 flex items-center gap-2 text-sm text-[#5F7A76]">
                  <FaHotel className="text-[#C9A227]" />
                  Selected APTDC Haritha stay — details & booking help
                </div>
                <ResortDetailPanel resort={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-[#5F7A76] text-sm py-8">
                Click any stay on the map to view full details.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
