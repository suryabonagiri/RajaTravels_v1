"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUsers, FaChevronDown, FaHeart } from "react-icons/fa";
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
          ? "bg-[#9B2226] text-white border-[#F4A261] shadow-[0_12px_40px_rgba(155,34,38,0.28)] scale-[1.02]"
          : isHovered
            ? "bg-white border-[#F4A261] shadow-[0_12px_32px_rgba(244,162,97,0.32)] scale-[1.03]"
            : "bg-white/95 border-[#E76F51]/15 shadow-md hover:border-[#F4A261]/55"
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
              ? "bg-[#F4A261] text-[#43140F]"
              : isHovered
                ? "bg-[#FFE8D6] text-[#C1121F]"
                : "bg-[#FFF0E6] text-[#E76F51]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[10px] uppercase tracking-[0.16em] font-semibold mb-1 ${
              isSelected ? "text-[#FFD6A5]" : "text-[#E76F51]"
            }`}
          >
            {pkg.duration} · {pkg.destination}
          </p>
          <p
            className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-snug ${
              isSelected ? "text-white" : "text-[#43140F]"
            }`}
          >
            {pkg.shortTitle || pkg.title}
          </p>
          <p
            className={`text-sm mt-2 leading-relaxed ${
              isSelected ? "text-white/85" : "text-[#8B5E4B]"
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
            } ${isSelected ? "text-[#FFD6A5]" : "text-[#C1121F]"}`}
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

function FamilyMarker({
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
          ? "bg-[#F4A261] border-white scale-110 shadow-[0_0_22px_rgba(244,162,97,0.85)]"
          : "bg-[#FFF8F2] border-[#E76F51]/30 shadow-md"
      }`}
    >
      <FaUsers
        className={`${icon} ${active ? "text-[#43140F]" : "text-[#E76F51]/75"}`}
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

export default function FamilyPackageJourney({
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
      {/* Warm family / celebration atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFE8D6] via-[#FFF5EE] to-[#FFF0E8]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_8%,rgba(244,162,97,0.28),transparent_42%),radial-gradient(ellipse_at_88%_18%,rgba(231,111,81,0.16),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(42,157,143,0.1),transparent_48%)]" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='2.5' fill='%23E76F51'/%3E%3Ccircle cx='28' cy='18' r='1.8' fill='%23F4A261'/%3E%3Ccircle cx='46' cy='10' r='2' fill='%232A9D8F'/%3E%3Ccircle cx='18' cy='38' r='2.2' fill='%23F4A261'/%3E%3Ccircle cx='40' cy='42' r='1.6' fill='%23E76F51'/%3E%3C/svg%3E\")",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[#E76F51] font-semibold tracking-[0.2em] text-xs uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <FaHeart className="text-sm" />
            Family celebration route
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#43140F] mb-3">
            Travel together. Pick your package.
          </h2>
          <p className="text-[#8B5E4B] text-sm md:text-base leading-relaxed">
            <span className="md:hidden">
              Tap a stop to open complete information, pricing, schedule, and photos — planned for kids, elders, and everyone in between.
            </span>
            <span className="hidden md:inline">
              Hover a stop to highlight it. Click any package to open complete information, pricing, schedule, and photos — planned for kids, elders, and everyone in between.
            </span>
          </p>
        </div>

        {/* Desktop: zigzag celebration path */}
        <div className="hidden md:block relative">
          <svg
            className="pointer-events-none absolute inset-y-4 left-1/2 z-0 h-[calc(100%-2rem)] w-[120px] -translate-x-1/2"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="familyPathFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4A261" stopOpacity="0.7" />
                <stop offset="40%" stopColor="#E76F51" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#2A9D8F" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#E9C46A" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 60 0
                 C 88 90, 95 160, 60 240
                 C 22 330, 15 410, 60 500
                 C 104 590, 108 680, 60 780
                 C 20 860, 28 920, 60 1000"
              fill="none"
              stroke="#FFE8D6"
              strokeWidth="40"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            <path
              d="M 60 0
                 C 88 90, 95 160, 60 240
                 C 22 330, 15 410, 60 500
                 C 104 590, 108 680, 60 780
                 C 20 860, 28 920, 60 1000"
              fill="none"
              stroke="url(#familyPathFill)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 60 0
                 C 88 90, 95 160, 60 240
                 C 22 330, 15 410, 60 500
                 C 104 590, 108 680, 60 780
                 C 20 860, 28 920, 60 1000"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeOpacity="0.9"
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
                    <FamilyMarker active={isActive} />
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

        {/* Mobile: vertical family path */}
        <div className="md:hidden relative pl-11">
          <div className="absolute left-4 top-3 bottom-3 w-2.5 rounded-full bg-gradient-to-b from-[#F4A261] via-[#E76F51] to-[#2A9D8F] overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.45)_10px,rgba(255,255,255,0.45)_14px)]" />
          </div>

          <div className="space-y-5">
            {packages.map((pkg, index) => {
              const isSelected = selectedId === pkg.id;
              const isHovered = hoveredId === pkg.id;
              return (
                <div key={pkg.id} className="relative">
                  <span className="absolute -left-[2.05rem] top-5 z-10">
                    <FamilyMarker size="sm" active={isSelected || isHovered} />
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
          className="scroll-mt-28 mt-16 md:mt-20 pt-10 md:pt-12 border-t border-[#E76F51]/20"
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
                <div className="mb-5 flex items-center gap-2 text-sm text-[#8B5E4B]">
                  <FaUsers className="text-[#E76F51]" />
                  Selected family package — full details & photos
                </div>
                <PackageDetailBlock pkg={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-[#8B5E4B] text-sm py-8">
                Click any package on the family route to view full details and photos.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
