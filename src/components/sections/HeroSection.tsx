"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaBus, FaShip, FaArrowDown, FaPhoneAlt } from "react-icons/fa";
import { BUSINESS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";

const heroSlides = [
  {
    image: "/images/bus-hero.jpg",
    alt: "Raja Travels premium bus on the road",
    badge: "Premium Bus Travel",
    badgeIcon: FaBus,
    headline: "Charter the road.",
    support:
      "Luxury coaches across Andhra Pradesh — family trips, weddings, and corporate journeys.",
  },
  {
    image: "/images/boat-hero.jpg",
    alt: "Scenic boat journey on the Godavari river",
    badge: "Papikondalu Boat Tourism",
    badgeIcon: FaShip,
    headline: "Cruise the Godavari.",
    support:
      "AP Tourism authorized boat tours through Papikondalu hills and river gorges.",
  },
];

const SLIDE_DURATION = 7000;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = heroSlides[activeSlide];
  const BadgeIcon = current.badgeIcon;

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden bg-primary-dark"
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: activeSlide === index ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${
              activeSlide === index ? "hero-kenburns" : ""
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-dark/92 via-primary-dark/55 to-primary-dark/35" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/45" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-4 md:mb-6"
        >
          Raja Travels
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <BadgeIcon className="text-sm" />
              {current.badge}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl text-white/95 leading-snug mb-4">
              {current.headline}
            </h1>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              {current.support}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => smoothScrollTo("journey")}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-dark font-semibold px-5 py-3 rounded-xl transition-colors shimmer cursor-pointer"
          >
            Explore the route
            <FaArrowDown className="text-xs" />
          </button>
          <a
            href={`tel:${BUSINESS.primaryPhone}`}
            className="inline-flex items-center gap-2 border border-white/25 hover:border-gold/50 text-white px-5 py-3 rounded-xl transition-colors"
          >
            <FaPhoneAlt className="text-xs text-gold" />
            Call {BUSINESS.primaryPhone}
          </a>
        </motion.div>

        <div className="mt-10 flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.badge}`}
              className="relative h-1 w-12 md:w-16 rounded-full bg-white/20 overflow-hidden cursor-pointer"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: activeSlide === index ? "100%" : "0%" }}
                transition={{
                  duration: activeSlide === index ? SLIDE_DURATION / 1000 : 0.3,
                  ease: "linear",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
