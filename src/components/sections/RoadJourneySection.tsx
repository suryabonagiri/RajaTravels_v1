"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  FaBus,
  FaShip,
  FaTree,
  FaHotel,
  FaUsers,
  FaBriefcase,
  FaMapMarkedAlt,
  FaArrowRight,
} from "react-icons/fa";
import { JOURNEY_STOPS, SERVICES } from "@/lib/constants";
import { cn, smoothScrollTo } from "@/lib/utils";

const iconMap: Record<string, ReactNode> = {
  map: <FaMapMarkedAlt className="text-xl" />,
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
            Our Route
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white mb-4">
            Services along the road
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            An overview of everything Raja Travels provides, then each service
            in order.
          </p>
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
                {stop.type === "overview" && (
                  <ul className="grid sm:grid-cols-2 gap-2 mb-3">
                    {SERVICES.map((service) => (
                      <li
                        key={service.id}
                        className="text-sm text-gold-light/90"
                      >
                        {service.title}
                      </li>
                    ))}
                  </ul>
                )}
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
          <div className="shrink-0 mb-3 md:mb-6 max-w-2xl">
            <p className="text-gold font-semibold tracking-[0.18em] text-[10px] md:text-xs uppercase mb-1.5">
              Raja Route
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-5xl text-white leading-tight">
              Follow the road through{" "}
              <span className="text-gradient-gold">our services</span>
            </h2>
            <p className="mt-2 text-white/65 text-xs md:text-base max-w-md hidden sm:block">
              Start with the full overview, then stop at each service as the bus
              rolls with your scroll.
            </p>
          </div>

          <div className="relative flex-1 min-h-0 grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">
            {/* Desktop left detail */}
            <div className="hidden md:flex items-center min-h-0 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desk-${activeStop.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-md ml-auto py-2"
                >
                  <StopDetail
                    stop={activeStop}
                    activeIndex={activeIndex}
                    stopCount={stopCount}
                    onCta={() => handleCta(activeStop.href)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Road */}
            <div className="relative w-12 sm:w-14 md:w-20 h-full justify-self-center">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-9 sm:w-10 md:w-12 rounded-full bg-[#1a2332] border border-white/10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,transparent,transparent_10px,rgba(255,255,255,0.04)_10px,rgba(255,255,255,0.04)_12px)]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-0.5 bg-[repeating-linear-gradient(180deg,#FBBF24_0_10px,transparent_10px_22px)] opacity-80" />
                <motion.div
                  className="absolute left-0 right-0 top-0 bg-gradient-to-b from-gold/35 to-gold/10"
                  style={{ height: roadFill }}
                />
              </div>

              {JOURNEY_STOPS.map((stop, index) => {
                const top = `${4 + (index / (stopCount - 1)) * 84}%`;
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

            {/* Right: stop list (desktop) / detail (mobile) */}
            <div className="min-h-0 flex flex-col justify-center overflow-y-auto">
              <nav
                aria-label="Journey stops"
                className="hidden md:block w-full max-w-xs"
              >
                <ul className="space-y-1.5">
                  {JOURNEY_STOPS.map((stop, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={stop.id}>
                        <button
                          type="button"
                          onClick={() => scrollToStop(index)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg transition-all duration-300 border",
                            isActive
                              ? "bg-gold/15 border-gold/40 text-white"
                              : "border-transparent text-white/45 hover:text-white/75 hover:bg-white/5",
                          )}
                        >
                          <span className="text-[10px] uppercase tracking-wider text-gold/80 block mb-0.5">
                            {index === 0 ? "Overview" : `Stop ${index}`}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isActive && "text-gold-light",
                            )}
                          >
                            {stop.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1">
                  {JOURNEY_STOPS.map((stop, index) => (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => scrollToStop(index)}
                      className={cn(
                        "shrink-0 text-[11px] px-2.5 py-1 rounded-full border transition-colors",
                        index === activeIndex
                          ? "bg-gold text-primary-dark border-gold font-semibold"
                          : "bg-white/5 text-white/55 border-white/10",
                      )}
                    >
                      {stop.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mob-${activeStop.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StopDetail
                      stop={activeStop}
                      activeIndex={activeIndex}
                      stopCount={stopCount}
                      onCta={() => handleCta(activeStop.href)}
                      compact
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StopDetail({
  stop,
  activeIndex,
  stopCount,
  onCta,
  compact = false,
}: {
  stop: (typeof JOURNEY_STOPS)[number];
  activeIndex: number;
  stopCount: number;
  onCta: () => void;
  compact?: boolean;
}) {
  return (
    <div>
      <div className={cn("flex items-center gap-3", compact ? "mb-2.5" : "mb-4")}>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30",
            compact ? "h-10 w-10" : "h-12 w-12",
          )}
        >
          {iconMap[stop.icon] ?? iconMap.map}
        </span>
        <div>
          <p className="text-gold/80 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
            Stop {activeIndex + 1} of {stopCount}
          </p>
          <p className="text-white/50 text-xs md:text-sm">{stop.label}</p>
        </div>
      </div>

      <h3
        className={cn(
          "font-[family-name:var(--font-heading)] text-white",
          compact ? "text-xl mb-2" : "text-2xl md:text-3xl mb-3",
        )}
      >
        {stop.title}
      </h3>
      <p
        className={cn(
          "text-white/70 leading-relaxed",
          compact ? "text-sm mb-3" : "text-sm md:text-base mb-5",
        )}
      >
        {stop.description}
      </p>

      {stop.type === "overview" && (
        <ul
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-x-4",
            compact ? "gap-y-1.5 mb-4" : "gap-y-2.5 mb-6",
          )}
        >
          {SERVICES.map((service, i) => (
            <li
              key={service.id}
              className="flex items-start gap-2 text-xs md:text-sm text-white/85"
            >
              <span className="mt-0.5 text-gold font-mono text-[10px] md:text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{service.title}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onCta}
        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-colors shimmer"
      >
        {stop.ctaLabel}
        <FaArrowRight className="text-xs" />
      </button>
    </div>
  );
}
