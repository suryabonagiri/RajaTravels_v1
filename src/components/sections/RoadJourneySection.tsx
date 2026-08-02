"use client";

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaBriefcase,
  FaBus,
  FaHotel,
  FaShip,
  FaTree,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { JOURNEY_CTA, SERVICES } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";

const ICONS = {
  bus: FaBus,
  boat: FaShip,
  forest: FaTree,
  resort: FaHotel,
  group: FaUsers,
  corporate: FaBriefcase,
} as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function BusGlyph() {
  return (
    <svg viewBox="0 0 48 64" className="w-full h-auto drop-shadow-lg" aria-hidden="true">
      <rect x="8" y="4" width="32" height="48" rx="8" fill="#F59E0B" />
      <rect x="12" y="10" width="24" height="14" rx="3" fill="#FEF3C7" />
      <rect x="12" y="28" width="10" height="8" rx="2" fill="#FEF3C7" />
      <rect x="26" y="28" width="10" height="8" rx="2" fill="#FEF3C7" />
      <rect x="14" y="48" width="8" height="6" rx="2" fill="#002D66" />
      <rect x="26" y="48" width="8" height="6" rx="2" fill="#002D66" />
      <circle cx="18" cy="58" r="4" fill="#1f2937" />
      <circle cx="30" cy="58" r="4" fill="#1f2937" />
      <rect x="20" y="2" width="8" height="4" rx="1" fill="#D97706" />
    </svg>
  );
}

export default function RoadJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const stops = SERVICES;
  const maxIndex = Math.max(stops.length - 1, 1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const busTop = useTransform(scrollYProgress, [0, 1], ["4%", "88%"]);
  const roadFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(maxIndex, Math.round(value * maxIndex));
    setActiveIndex(next);
  });

  const activeStop = stops[activeIndex];
  const ActiveIcon = ICONS[activeStop.icon as keyof typeof ICONS] ?? FaBus;
  const cta = JOURNEY_CTA[activeStop.id] ?? {
    href: "contact",
    label: "Plan a trip",
  };

  const sectionHeight = useMemo(
    () => `${Math.max(stops.length, 2) * 95}vh`,
    [stops.length]
  );

  const scrollToStop = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const travel = el.offsetHeight - window.innerHeight;
    const target = absoluteTop + (index / maxIndex) * travel;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  if (reduceMotion) {
    return (
      <section id="journey" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-[#061530]" />
        <div className="absolute inset-0 bg-pattern opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-gold font-semibold tracking-wide text-sm uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-8">
            Everything we offer
          </h2>
          <ol className="space-y-8 border-l border-gold/40 pl-6">
            {stops.map((service, i) => {
              const itemCta = JOURNEY_CTA[service.id];
              return (
                <li key={service.id} className="relative">
                  <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-gold" />
                  <p className="text-gold font-mono text-xs mb-1">{pad(i + 1)}</p>
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  {itemCta && (
                    <button
                      type="button"
                      onClick={() => smoothScrollTo(itemCta.href)}
                      className="inline-flex items-center gap-2 text-gold text-sm font-medium cursor-pointer"
                    >
                      {itemCta.label}
                      <FaArrowRight className="text-xs" />
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-[#071a38]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(245,158,11,0.14),transparent_45%),radial-gradient(ellipse_at_80%_80%,rgba(26,99,191,0.35),transparent_50%)]" />
        <div className="absolute inset-0 bg-pattern opacity-25" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 md:pt-24 md:pb-8 flex flex-col">
          <div className="shrink-0 mb-4 md:mb-8">
            <p className="text-gold font-semibold tracking-[0.18em] text-[10px] md:text-xs uppercase mb-1.5">
              Raja Route
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              Scroll to open each <span className="text-gradient-gold">service</span>
            </h2>
          </div>

          <div className="relative flex-1 min-h-0 grid grid-cols-[auto_1fr] gap-4 md:gap-10">
            {/* Road tracker */}
            <div className="relative w-12 sm:w-14 md:w-20 h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-9 sm:w-10 md:w-12 rounded-full bg-[#1a2332] border border-white/10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.04)_10px,rgba(255,255,255,0.04)_12px)]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-0.5 bg-[repeating-linear-gradient(180deg,#FBBF24_0_10px,transparent_10px_22px)] opacity-80" />
                <motion.div
                  className="absolute left-0 right-0 top-0 bg-gradient-to-b from-gold/35 to-gold/10"
                  style={{ height: roadFill }}
                />
              </div>

              {stops.map((service, i) => (
                <button
                  key={service.id}
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  style={{ top: `${4 + (i / maxIndex) * 84}%` }}
                  aria-label={`Go to ${service.title}`}
                  aria-current={i === activeIndex ? "step" : undefined}
                  onClick={() => scrollToStop(i)}
                >
                  <span
                    className={`block rounded-full border-2 transition-all duration-300 ${
                      i === activeIndex
                        ? "h-3.5 w-3.5 bg-gold border-white scale-125 shadow-[0_0_16px_rgba(245,158,11,0.7)]"
                        : i < activeIndex
                          ? "h-3 w-3 bg-gold/80 border-gold-light"
                          : "h-3 w-3 bg-primary-dark border-white/40"
                    }`}
                  />
                </button>
              ))}

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-20 w-8 sm:w-9 md:w-10"
                style={{ top: busTop }}
              >
                <div className="journey-bus will-change-transform">
                  <BusGlyph />
                </div>
              </motion.div>
            </div>

            {/* Active service panel */}
            <div className="min-h-0 flex items-center overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStop.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xl py-1"
                >
                  <p className="text-gold/80 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2">
                    Service {activeIndex + 1} of {stops.length}
                  </p>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                      <ActiveIcon className="text-xl" />
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl md:text-3xl text-white leading-snug">
                      {activeStop.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                    {activeStop.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo(cta.href)}
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors shimmer cursor-pointer"
                  >
                    {cta.label}
                    <FaArrowRight className="text-xs" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
