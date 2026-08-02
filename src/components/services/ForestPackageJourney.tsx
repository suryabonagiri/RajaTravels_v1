"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTree, FaChevronDown, FaLeaf } from "react-icons/fa";
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
          ? "bg-[#1B4332] text-white border-[#95D5B2] shadow-[0_12px_40px_rgba(27,67,50,0.35)] scale-[1.02]"
          : isHovered
            ? "bg-white border-[#52B788] shadow-[0_12px_32px_rgba(82,183,136,0.28)] scale-[1.03]"
            : "bg-white/95 border-[#2D6A4F]/15 shadow-md hover:border-[#52B788]/50"
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
              ? "bg-[#95D5B2] text-[#081C15]"
              : isHovered
                ? "bg-[#D8F3DC] text-[#1B4332]"
                : "bg-[#D8F3DC]/80 text-[#2D6A4F]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[10px] uppercase tracking-[0.16em] font-semibold mb-1 ${
              isSelected ? "text-[#B7E4C7]" : "text-[#40916C]"
            }`}
          >
            {pkg.duration} · {pkg.destination}
          </p>
          <p
            className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-snug ${
              isSelected ? "text-white" : "text-[#1B4332]"
            }`}
          >
            {pkg.shortTitle || pkg.title}
          </p>
          <p
            className={`text-sm mt-2 leading-relaxed ${
              isSelected ? "text-white/85" : "text-[#52796F]"
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
            } ${isSelected ? "text-[#B7E4C7]" : "text-[#2D6A4F]"}`}
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

function ForestMarker({
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
          ? "bg-[#95D5B2] border-white scale-110 shadow-[0_0_22px_rgba(149,213,178,0.85)]"
          : "bg-[#F1FAEE] border-[#2D6A4F]/30 shadow-md"
      }`}
    >
      <FaTree
        className={`${icon} ${active ? "text-[#081C15]" : "text-[#2D6A4F]/70"}`}
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

export default function ForestPackageJourney({
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
      {/* Forest canopy atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D8F3DC] via-[#F1FAEE] to-[#E9F5EC]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(45,106,79,0.18),transparent_42%),radial-gradient(ellipse_at_85%_20%,rgba(82,183,136,0.2),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(27,67,50,0.12),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 4c-2 8-10 12-10 20 0 6 4 10 10 10s10-4 10-10c0-8-8-12-10-20zm-12 28c-1.5 5-7 8-7 13 0 4 3 7 7 7s7-3 7-7c0-5-5.5-8-7-13zm24 0c-1.5 5-7 8-7 13 0 4 3 7 7 7s7-3 7-7c0-5-5.5-8-7-13z' fill='%231B4332' fill-opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[#40916C] font-semibold tracking-[0.2em] text-xs uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <FaLeaf className="text-sm" />
            Eastern Ghats forest trail
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[#1B4332] mb-3">
            Walk the forest. Pick your package.
          </h2>
          <p className="text-[#52796F] text-sm md:text-base leading-relaxed">
            Hover a trail stop to highlight it. Click any package to open complete
            information, pricing, schedule, and photos.
          </p>
        </div>

        {/* Desktop: zigzag forest path */}
        <div className="hidden md:block relative">
          <svg
            className="pointer-events-none absolute inset-y-4 left-1/2 z-0 h-[calc(100%-2rem)] w-[120px] -translate-x-1/2"
            viewBox="0 0 120 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="forestTrailFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#40916C" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#95D5B2" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {/* Soft moss bed under the trail */}
            <path
              d="M 60 0
                 C 88 90, 95 160, 60 240
                 C 22 330, 15 410, 60 500
                 C 104 590, 108 680, 60 780
                 C 20 860, 28 920, 60 1000"
              fill="none"
              stroke="#95D5B2"
              strokeWidth="40"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />
            <path
              d="M 60 0
                 C 88 90, 95 160, 60 240
                 C 22 330, 15 410, 60 500
                 C 104 590, 108 680, 60 780
                 C 20 860, 28 920, 60 1000"
              fill="none"
              stroke="url(#forestTrailFill)"
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
              stroke="#D8F3DC"
              strokeWidth="2"
              strokeDasharray="8 14"
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
                    <ForestMarker active={isActive} />
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

        {/* Mobile: vertical forest trail */}
        <div className="md:hidden relative pl-11">
          <div className="absolute left-4 top-3 bottom-3 w-2.5 rounded-full bg-gradient-to-b from-[#2D6A4F] via-[#40916C] to-[#95D5B2] overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(241,250,238,0.4)_10px,rgba(241,250,238,0.4)_14px)]" />
          </div>

          <div className="space-y-5">
            {packages.map((pkg, index) => {
              const isSelected = selectedId === pkg.id;
              const isHovered = hoveredId === pkg.id;
              return (
                <div key={pkg.id} className="relative">
                  <span className="absolute -left-[2.05rem] top-5 z-10">
                    <ForestMarker size="sm" active={isSelected || isHovered} />
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
          className="scroll-mt-28 mt-16 md:mt-20 pt-10 md:pt-12 border-t border-[#2D6A4F]/15"
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
                <div className="mb-5 flex items-center gap-2 text-sm text-[#52796F]">
                  <FaTree className="text-[#40916C]" />
                  Selected forest package — full details & photos
                </div>
                <PackageDetailBlock pkg={selected} />
              </motion.div>
            ) : (
              <p className="text-center text-[#52796F] text-sm py-8">
                Click any package on the forest trail to view full details and photos.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
