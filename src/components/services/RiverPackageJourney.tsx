"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaShip, FaChevronDown } from "react-icons/fa";
import type { TourPackage } from "@/lib/constants";
import PackageDetailBlock from "@/components/services/PackageDetailBlock";

function PackageStopCard({
  pkg,
  index,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onSelect,
  align = "left",
}: {
  pkg: TourPackage;
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
          ? "bg-primary text-white border-gold shadow-[0_12px_40px_rgba(0,71,158,0.28)] scale-[1.02]"
          : isHovered
            ? "bg-white border-gold/70 shadow-[0_12px_32px_rgba(245,158,11,0.22)] scale-[1.03]"
            : "bg-white border-primary/10 shadow-md hover:border-gold/40"
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
              ? "bg-gold text-primary-dark"
              : isHovered
                ? "bg-gold/15 text-gold-dark"
                : "bg-primary/5 text-primary"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[10px] uppercase tracking-[0.16em] font-semibold mb-1 ${
              isSelected ? "text-gold-light" : "text-gold-dark"
            }`}
          >
            {pkg.duration} · {pkg.destination}
          </p>
          <p
            className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-snug ${
              isSelected ? "text-white" : "text-primary"
            }`}
          >
            {pkg.shortTitle || pkg.title}
          </p>
          <p
            className={`text-sm mt-2 leading-relaxed ${
              isSelected ? "text-white/80" : "text-text-secondary"
            }`}
          >
            {pkg.summary ||
              `${pkg.adultPrice}${
                pkg.childPrice && pkg.childPrice !== "—"
                  ? ` · Child ${pkg.childPrice}`
                  : ""
              }`}
          </p>
          <p
            className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${
              align === "right" ? "md:flex-row-reverse" : ""
            } ${isSelected ? "text-gold-light" : "text-gold-dark"}`}
          >
            {isSelected ? "Open below — full details & photos" : "Click to open full details"}
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

function RiverMarker({
  active,
  size = "md",
}: {
  active: boolean;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-8 w-8 border-2" : "h-10 w-10 border-[3px]";
  const icon = size === "sm" ? "text-[11px]" : "text-sm";
  return (
    <span
      className={`relative z-20 flex items-center justify-center rounded-full transition-all duration-300 ${box} ${
        active
          ? "bg-gold border-white scale-110 shadow-[0_0_22px_rgba(245,158,11,0.75)]"
          : "bg-white border-primary/25 shadow-md"
      }`}
    >
      <FaShip
        className={`${icon} ${active ? "text-primary-dark" : "text-primary/50"}`}
      />
    </span>
  );
}

function readInitialPackageId(
  packages: TourPackage[],
  initialPackageId?: string
) {
  if (initialPackageId && packages.some((p) => p.id === initialPackageId)) {
    return initialPackageId;
  }
  if (typeof window !== "undefined") {
    const hash = window.location.hash.replace("#package-", "");
    if (hash && packages.some((p) => p.id === hash)) return hash;
  }
  return packages[0]?.id ?? null;
}

export default function RiverPackageJourney({
  packages,
  initialPackageId,
}: {
  packages: TourPackage[];
  initialPackageId?: string;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    readInitialPackageId(packages, initialPackageId)
  );

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.replace("#package-", "");
      if (next && packages.some((p) => p.id === next)) {
        setSelectedId(next);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [packages]);

  const selected = packages.find((p) => p.id === selectedId) ?? null;

  const selectPackage = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#package-${id}`);
      window.setTimeout(() => {
        document
          .getElementById("package-detail-panel")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f3fb] via-white to-[#f8fafc]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,71,158,0.07),transparent_45%),radial-gradient(ellipse_at_80%_90%,rgba(245,158,11,0.08),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-gold font-semibold tracking-[0.2em] text-xs uppercase mb-3">
            Godavari package route
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-primary mb-3">
            Follow the river. Pick your package.
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Hover a stop to highlight it. Click any package to open complete
            information, pricing, schedule, and photos.
          </p>
        </div>

        {/* Desktop: document-flow zigzag — no absolute stacking, so cards never overlap */}
        <div className="hidden md:block relative">
          {/* Curvy river drawn behind the stops; height follows content */}
          <svg
            className="pointer-events-none absolute inset-y-4 left-1/2 z-0 h-[calc(100%-2rem)] w-[120px] -translate-x-1/2"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="riverFillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A63BF" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#00479E" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.45" />
              </linearGradient>
            </defs>
            <path
              d="M 60 0
                 C 92 80, 98 140, 60 210
                 C 18 290, 10 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 12 760, 20 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="url(#riverFillDesktop)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 60 0
                 C 92 80, 98 140, 60 210
                 C 18 290, 10 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 12 760, 20 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2.2"
              strokeDasharray="10 12"
              strokeOpacity="0.95"
            />
          </svg>

          <ol className="relative z-10 space-y-10 lg:space-y-12">
            {packages.map((pkg, index) => {
              const isLeft = index % 2 === 0;
              const isSelected = selectedId === pkg.id;
              const isHovered = hoveredId === pkg.id;
              const isActive = isSelected || isHovered;

              return (
                <li
                  key={pkg.id}
                  className="grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] items-center gap-x-3 lg:gap-x-5"
                >
                  {/* Left column */}
                  <div className={isLeft ? "justify-self-end w-full max-w-md" : ""}>
                    {isLeft ? (
                      <PackageStopCard
                        pkg={pkg}
                        index={index}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        align="right"
                        onHover={() => setHoveredId(pkg.id)}
                        onLeave={() => setHoveredId(null)}
                        onSelect={() => selectPackage(pkg.id)}
                      />
                    ) : null}
                  </div>

                  {/* Center marker on the river */}
                  <div className="flex justify-center">
                    <RiverMarker active={isActive} />
                  </div>

                  {/* Right column */}
                  <div className={!isLeft ? "justify-self-start w-full max-w-md" : ""}>
                    {!isLeft ? (
                      <PackageStopCard
                        pkg={pkg}
                        index={index}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        align="left"
                        onHover={() => setHoveredId(pkg.id)}
                        onLeave={() => setHoveredId(null)}
                        onSelect={() => selectPackage(pkg.id)}
                      />
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: vertical waterway with stacked cards */}
        <div className="md:hidden relative pl-11">
          <div className="absolute left-4 top-3 bottom-3 w-2.5 rounded-full bg-gradient-to-b from-primary-light via-primary to-gold overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.35)_10px,rgba(255,255,255,0.35)_14px)]" />
          </div>

          <div className="space-y-5">
            {packages.map((pkg, index) => {
              const isSelected = selectedId === pkg.id;
              const isHovered = hoveredId === pkg.id;
              return (
                <div key={pkg.id} className="relative">
                  <span className="absolute -left-[2.05rem] top-5 z-10">
                    <RiverMarker size="sm" active={isSelected || isHovered} />
                  </span>
                  <PackageStopCard
                    pkg={pkg}
                    index={index}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    onHover={() => setHoveredId(pkg.id)}
                    onLeave={() => setHoveredId(null)}
                    onSelect={() => selectPackage(pkg.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel — clear separation below the full river */}
        <div
          id="package-detail-panel"
          className="scroll-mt-28 mt-16 md:mt-20 pt-10 md:pt-12 border-t border-primary/10"
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
                <div className="mb-5 flex items-center gap-2 text-sm text-text-secondary">
                  <FaShip className="text-gold" />
                  Selected package — full details & photos
                </div>
                <PackageDetailBlock pkg={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-text-secondary text-sm py-8">
                Click any package on the river to view full details and photos.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
