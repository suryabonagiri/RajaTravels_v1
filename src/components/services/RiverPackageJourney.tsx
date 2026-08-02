"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaShip, FaChevronDown } from "react-icons/fa";
import type { TourPackage } from "@/lib/constants";
import PackageDetailBlock from "@/components/services/PackageDetailBlock";

type StopLayout = {
  pkg: TourPackage;
  index: number;
  y: number;
  side: "left" | "right";
};

function buildLayouts(packages: TourPackage[]): StopLayout[] {
  const count = Math.max(packages.length - 1, 1);
  return packages.map((pkg, index) => ({
    pkg,
    index,
    y: 6 + (index / count) * 88,
    side: index % 2 === 0 ? "left" : "right",
  }));
}

function PackageStopCard({
  pkg,
  index,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: {
  pkg: TourPackage;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
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
        isSelected
          ? "bg-primary text-white border-gold shadow-[0_12px_40px_rgba(0,71,158,0.28)] scale-[1.02]"
          : isHovered
            ? "bg-white border-gold/70 shadow-[0_12px_32px_rgba(245,158,11,0.22)] scale-[1.03]"
            : "bg-white border-primary/10 shadow-md hover:border-gold/40"
      }`}
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex items-start gap-3">
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
            className={`text-sm mt-2 ${
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
              isSelected ? "text-gold-light" : "text-gold-dark"
            }`}
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
  const layouts = useMemo(() => buildLayouts(packages), [packages]);
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
      }, 50);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f3fb] via-white to-[#f8fafc]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,71,158,0.07),transparent_45%),radial-gradient(ellipse_at_80%_90%,rgba(245,158,11,0.08),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
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

        {/* Desktop / tablet: curvy river with alternating package cards */}
        <div className="hidden md:block relative h-[920px]">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="riverFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A63BF" stopOpacity="0.38" />
                <stop offset="55%" stopColor="#00479E" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M 50 0
                 C 64 7, 72 15, 58 23
                 C 40 33, 26 40, 40 50
                 C 58 62, 76 68, 58 78
                 C 40 88, 46 94, 50 100"
              fill="none"
              stroke="url(#riverFill)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 50 0
                 C 64 7, 72 15, 58 23
                 C 40 33, 26 40, 40 50
                 C 58 62, 76 68, 58 78
                 C 40 88, 46 94, 50 100"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="0.6"
              strokeDasharray="2.4 2.6"
              strokeOpacity="0.9"
            />
          </svg>

          {layouts.map(({ pkg, index, y, side }) => {
            const isSelected = selectedId === pkg.id;
            const isHovered = hoveredId === pkg.id;
            const isActive = isSelected || isHovered;

            return (
              <div
                key={pkg.id}
                className="absolute left-1/2 -translate-x-1/2 w-full max-w-5xl px-2"
                style={{ top: `${y}%` }}
              >
                <div
                  className={`relative flex items-center ${
                    side === "left" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-[42%] ${
                      side === "left" ? "mr-[8%]" : "ml-[8%]"
                    }`}
                  >
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

                  <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-gold border-white scale-125 shadow-[0_0_20px_rgba(245,158,11,0.75)]"
                        : "bg-white border-primary/30"
                    }`}
                  >
                    <FaShip
                      className={`text-[11px] ${
                        isActive ? "text-primary-dark" : "text-primary/45"
                      }`}
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical waterway with large stacked cards */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-2 rounded-full bg-gradient-to-b from-primary-light via-primary to-gold overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.35)_10px,rgba(255,255,255,0.35)_14px)]" />
          </div>

          <div className="space-y-4">
            {packages.map((pkg, index) => {
              const isSelected = selectedId === pkg.id;
              const isHovered = hoveredId === pkg.id;
              return (
                <div key={pkg.id} className="relative">
                  <span
                    className={`absolute -left-[1.65rem] top-6 z-10 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                      isSelected || isHovered
                        ? "bg-gold border-white scale-125 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
                        : "bg-white border-primary/40"
                    }`}
                  />
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

        <div id="package-detail-panel" className="scroll-mt-28 mt-12 md:mt-16">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
                  <FaShip className="text-gold" />
                  Selected package — full details & photos
                </div>
                <PackageDetailBlock pkg={selected} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
