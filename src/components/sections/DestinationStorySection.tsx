"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { DESTINATIONS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";

export default function DestinationStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(DESTINATIONS.length - 1, 1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(maxIndex, Math.round(value * maxIndex));
    setActiveIndex(next);
  });

  const active = DESTINATIONS[activeIndex];

  if (reduceMotion) {
    return (
      <section id="destinations" className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <div>
            <p className="text-gold font-semibold tracking-[0.18em] text-xs uppercase mb-2">
              Destinations
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-primary">
              Places we take you
            </h2>
          </div>
          {DESTINATIONS.map((dest) => (
            <article key={dest.id} className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-gold text-sm font-semibold mb-2">{dest.subtitle}</p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-3">
                  {dest.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {dest.description}
                </p>
                <p className="text-sm text-primary/70">{dest.highlights.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative"
      style={{ height: `${DESTINATIONS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-primary-dark">
        {DESTINATIONS.map((dest, i) => (
          <div
            key={dest.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          >
            <Image
              src={dest.image}
              alt={dest.title}
              fill
              priority={i === 0}
              className="object-cover scale-105"
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-primary-dark/30" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24 pt-28">
          <p className="text-gold font-semibold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3">
            Destinations · {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(DESTINATIONS.length).padStart(2, "0")}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-white/55 text-sm md:text-base mb-2">{active.subtitle}</p>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                {active.title}
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-5">
                {active.description}
              </p>
              <p className="text-gold-light/90 text-sm mb-6 tracking-wide">
                {active.highlights.join("  ·  ")}
              </p>
              <button
                type="button"
                onClick={() => smoothScrollTo("packages")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark bg-gold hover:bg-gold-light px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                See packages
                <FaArrowRight className="text-xs" />
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex gap-2">
            {DESTINATIONS.map((dest, i) => (
              <button
                key={dest.id}
                type="button"
                aria-label={`Show ${dest.title}`}
                onClick={() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  const absoluteTop = window.scrollY + rect.top;
                  const travel = el.offsetHeight - window.innerHeight;
                  window.scrollTo({
                    top: absoluteTop + (i / maxIndex) * travel,
                    behavior: "smooth",
                  });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? "w-10 bg-gold" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
