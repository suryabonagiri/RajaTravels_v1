"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaShip, FaChevronDown, FaWater } from "react-icons/fa";
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
          ? "bg-[#023E8A] text-white border-[#90E0EF] shadow-[0_12px_40px_rgba(2,62,138,0.28)] scale-[1.02]"
          : isHovered
            ? "bg-white border-[#48CAE4] shadow-[0_12px_32px_rgba(72,202,228,0.3)] scale-[1.03]"
            : "bg-white/95 border-[#0077B6]/12 shadow-md hover:border-[#48CAE4]/50"
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
              ? "bg-[#90E0EF] text-[#023E8A]"
              : isHovered
                ? "bg-[#CAF0F8] text-[#0077B6]"
                : "bg-[#E0F7FA] text-[#0077B6]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[10px] uppercase tracking-[0.16em] font-semibold mb-1 ${
              isSelected ? "text-[#CAF0F8]" : "text-[#0096C7]"
            }`}
          >
            {pkg.duration} · {pkg.destination}
          </p>
          <p
            className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-snug ${
              isSelected ? "text-white" : "text-[#023E8A]"
            }`}
          >
            {pkg.shortTitle || pkg.title}
          </p>
          <p
            className={`text-sm mt-2 leading-relaxed ${
              isSelected ? "text-white/85" : "text-[#5B8BA8]"
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
            } ${isSelected ? "text-[#CAF0F8]" : "text-[#0077B6]"}`}
          >
            {isSelected ? "Open below — full details & photos" : (
              <>
                <span className="md:hidden">Tap to open full details</span>
                <span className="hidden md:inline">Click to open full details</span>
              </>
            )}
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
          ? "bg-[#90E0EF] border-white scale-110 shadow-[0_0_22px_rgba(144,224,239,0.9)]"
          : "bg-[#F0FBFF] border-[#48CAE4]/45 shadow-md"
      }`}
    >
      <FaShip
        className={`${icon} ${active ? "text-[#023E8A]" : "text-[#0077B6]/65"}`}
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
      {/* Soft watery atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CAF0F8] via-[#E8F7FC] to-[#F0FBFF]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_5%,rgba(0,180,216,0.22),transparent_42%),radial-gradient(ellipse_at_85%_25%,rgba(144,224,239,0.35),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(2,62,138,0.08),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q20 8 40 20 T80 20' fill='none' stroke='%230077B6' stroke-width='2'/%3E%3Cpath d='M0 30 Q20 18 40 30 T80 30' fill='none' stroke='%2348CAE4' stroke-width='1.5'/%3E%3C/svg%3E\")",
          backgroundSize: "80px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[#0096C7] font-semibold tracking-[0.2em] text-xs uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <FaWater className="text-sm" />
            Godavari package route
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#023E8A] mb-3">
            Follow the river. Pick your package.
          </h2>
          <p className="text-[#5B8BA8] text-sm md:text-base leading-relaxed">
            <span className="md:hidden">Tap a stop to open complete information, pricing, schedule, and photos.</span>
            <span className="hidden md:inline">Hover a stop to highlight it. Click any package to open complete information, pricing, schedule, and photos.</span>
          </p>
        </div>

        {/* Desktop: document-flow zigzag river */}
        <div className="hidden md:block relative">
          <svg
            className="pointer-events-none absolute inset-y-4 left-1/2 z-0 h-[calc(100%-2rem)] w-[120px] -translate-x-1/2"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="riverFillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#48CAE4" stopOpacity="0.65" />
                <stop offset="40%" stopColor="#00B4D8" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0077B6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#90E0EF" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {/* Soft water halo */}
            <path
              d="M 60 0
                 C 92 80, 98 140, 60 210
                 C 18 290, 10 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 12 760, 20 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="#CAF0F8"
              strokeWidth="42"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M 60 0
                 C 92 80, 98 140, 60 210
                 C 18 290, 10 360, 60 440
                 C 108 520, 112 600, 60 680
                 C 12 760, 20 840, 60 920
                 C 84 960, 72 980, 60 1000"
              fill="none"
              stroke="url(#riverFillDesktop)"
              strokeWidth="26"
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
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="8 12"
              strokeOpacity="0.85"
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

                  <div className="flex justify-center">
                    <RiverMarker active={isActive} />
                  </div>

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

        {/* Mobile: vertical waterway */}
        <div className="md:hidden relative pl-11">
          <div className="absolute left-4 top-3 bottom-3 w-2.5 rounded-full bg-gradient-to-b from-[#48CAE4] via-[#00B4D8] to-[#0077B6] overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.45)_10px,rgba(255,255,255,0.45)_14px)]" />
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

        <div
          id="package-detail-panel"
          className="scroll-mt-28 mt-16 md:mt-20 pt-10 md:pt-12 border-t border-[#0077B6]/15"
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
                <div className="mb-5 flex items-center gap-2 text-sm text-[#5B8BA8]">
                  <FaShip className="text-[#00B4D8]" />
                  Selected package — full details & photos
                </div>
                <PackageDetailBlock pkg={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-[#5B8BA8] text-sm py-8">
                Click any package on the river to view full details and photos.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
