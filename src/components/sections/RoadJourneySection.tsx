"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  FaBus,
  FaShip,
  FaTree,
  FaHotel,
  FaUsers,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";
import { JOURNEY_STOPS } from "@/lib/constants";
import { cn, smoothScrollTo } from "@/lib/utils";

const iconMap: Record<string, ReactNode> = {
  bus: <FaBus className="text-xl" />,
  boat: <FaShip className="text-xl" />,
  forest: <FaTree className="text-xl" />,
  resort: <FaHotel className="text-xl" />,
  group: <FaUsers className="text-xl" />,
  corporate: <FaBriefcase className="text-xl" />,
};

function progressToIndex(progress: number, count: number): number {
  if (count <= 1) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(count - 1, Math.round(clamped * (count - 1)));
}

function BusMarker({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      className={cn("drop-shadow-lg", className)}
      aria-hidden
    >
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const stopCount = JOURNEY_STOPS.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const busTop = useTransform(scrollYProgress, [0, 1], ["4%", "88%"]);
  const roadFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(progressToIndex(latest, stopCount));
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const activeStop = JOURNEY_STOPS[activeIndex];

  const sectionHeight = useMemo(
    () => `${Math.max(stopCount, 2) * 95}vh`,
    [stopCount],
  );

  const handleCta = (href: string) => {
    if (href.startsWith("#")) {
      smoothScrollTo(href.slice(1));
    }
  };

  const scrollToStop = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target =
      absoluteTop + (index / Math.max(stopCount - 1, 1)) * scrollable;
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
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-6">
            Everything we offer
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {JOURNEY_STOPS.map((stop, index) => (
              <li key={stop.id} className="text-sm text-gold-light/90">
                <span className="text-gold font-mono text-xs mr-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {stop.title}
              </li>
            ))}
          </ul>
          <ol className="space-y-8 border-l border-gold/40 pl-6">
            {JOURNEY_STOPS.map((stop) => (
              <li key={stop.id} className="relative">
                <span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-gold" />
                <h3 className="text-xl text-white font-semibold mb-2">
                  {stop.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-3">
                  {stop.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleCta(stop.href)}
                  className="inline-flex items-center gap-2 text-gold text-sm font-medium"
                >
                  {stop.ctaLabel}
                  <FaArrowRight className="text-xs" />
                </button>
              </li>
            ))}
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
          {/* Top: always show all services with full names */}
          <div className="shrink-0 mb-3 md:mb-5">
            <p className="text-gold font-semibold tracking-[0.18em] text-[10px] md:text-xs uppercase mb-1.5">
              Raja Route
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3 md:mb-4">
              All services we{" "}
              <span className="text-gradient-gold">offer</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-2">
              {JOURNEY_STOPS.map((stop, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={stop.id}>
                    <button
                      type="button"
                      onClick={() => scrollToStop(index)}
                      className={cn(
                        "w-full text-left flex items-start gap-2 rounded-lg px-2.5 py-2 border transition-all duration-300",
                        isActive
                          ? "bg-gold/15 border-gold/45 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/30 hover:text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 font-mono text-[10px] md:text-xs shrink-0",
                          isActive ? "text-gold" : "text-gold/60",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-xs md:text-sm font-medium leading-snug",
                          isActive && "text-gold-light",
                        )}
                      >
                        {stop.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative flex-1 min-h-0 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr] gap-4 md:gap-10">
            {/* Road */}
            <div className="relative w-12 sm:w-14 md:w-20 h-full">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-9 sm:w-10 md:w-12 rounded-full bg-[#1a2332] border border-white/10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.04)_10px,rgba(255,255,255,0.04)_12px)]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-0.5 bg-[repeating-linear-gradient(180deg,#FBBF24_0_10px,transparent_10px_22px)] opacity-80" />
                <motion.div
                  className="absolute left-0 right-0 top-0 bg-gradient-to-b from-gold/35 to-gold/10"
                  style={{ height: roadFill }}
                />
              </div>

              {JOURNEY_STOPS.map((stop, index) => {
                const top = `${4 + (index / Math.max(stopCount - 1, 1)) * 84}%`;
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    aria-label={`Go to ${stop.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ top }}
                    onClick={() => scrollToStop(index)}
                  >
                    <span
                      className={cn(
                        "block h-3 w-3 rounded-full border-2 transition-all duration-300",
                        isActive &&
                          "h-3.5 w-3.5 bg-gold border-white scale-125 shadow-[0_0_16px_rgba(245,158,11,0.7)]",
                        !isActive &&
                          isPassed &&
                          "bg-gold/80 border-gold-light",
                        !isActive &&
                          !isPassed &&
                          "bg-primary-dark border-white/40",
                      )}
                    />
                  </button>
                );
              })}

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-20 w-8 sm:w-9 md:w-10 will-change-transform"
                style={{ top: busTop }}
              >
                <motion.div
                  animate={{ x: [0, 1.2, -1.2, 0] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BusMarker className="w-full h-auto" />
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll content: service elaboration only */}
            <div className="min-h-0 flex items-center overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStop.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xl py-1"
                >
                  <p className="text-gold/80 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2">
                    Service {activeIndex + 1} of {stopCount}
                  </p>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                      {iconMap[activeStop.icon] ?? iconMap.bus}
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
                    onClick={() => handleCta(activeStop.href)}
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors shimmer"
                  >
                    {activeStop.ctaLabel}
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
