"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import BookingForm from "@/components/ui/BookingForm";
import { FaShieldAlt, FaBus, FaMapMarkedAlt, FaShip } from "react-icons/fa";

/**
 * Hero video slides configuration.
 * Place your videos in /public/videos/ folder:
 *   - bus-hero.mp4
 *   - boat-hero.mp4
 */
const heroSlides = [
  {
    video: "/videos/bus-hero.mp4",
    badge: "Premium Bus Travel",
    badgeIcon: <FaBus className="text-sm" />,
    heading: (
      <>
        Your Journey
        <br />
        <span className="text-gradient-gold">Begins Here</span>
      </>
    ),
    subtitle:
      "AP Tourism Authorized Agent offering luxury coaches across Andhra Pradesh — for corporate events, marriages, and family celebrations.",
  },
  {
    video: "/videos/boat-hero.mp4",
    badge: "Papikondalu Boat Tourism",
    badgeIcon: <FaShip className="text-sm" />,
    heading: (
      <>
        Explore the
        <br />
        <span className="text-gradient-gold">Godavari Magic</span>
      </>
    ),
    subtitle:
      "Cruise through the majestic Papikondalu hills on the Godavari river. AP Tourism authorized boat tours and eco adventures.",
  },
];

const trustBadges = [
  { icon: <FaShieldAlt />, text: "AP Tourism Authorized Agent" },
  { icon: <FaBus />, text: "Premium Fleet" },
  { icon: <FaMapMarkedAlt />, text: "10+ Years Experience" },
];

const SLIDE_DURATION = 8000; // 8 seconds per slide

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Auto-rotate slides
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Mark loaded after mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-dark"
    >
      {/* ──────────── VIDEO BACKGROUNDS ──────────── */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.video}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: activeSlide === index ? 1 : 0 }}
        >
          {/* Video element with cinematic zoom */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: activeSlide === index
                ? "heroZoom 20s ease-in-out infinite alternate"
                : "none",
            }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* ──────────── CINEMATIC OVERLAYS ──────────── */}
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary-dark/80 z-[1]" />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-transparent to-primary-dark/50 z-[1]" />

      {/* Subtle animated grain texture */}
      <div className="absolute inset-0 bg-pattern opacity-20 z-[1]" />

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-[2]" />

      {/* ──────────── SLIDE INDICATORS ──────────── */}
      <div className="absolute bottom-28 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className="group relative cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-12 md:w-16 h-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-gold rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: activeSlide === index ? "100%" : "0%",
                }}
                transition={{
                  duration: activeSlide === index ? SLIDE_DURATION / 1000 : 0.3,
                  ease: "linear",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* ──────────── MAIN CONTENT ──────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ──── Left: Animated text content ──── */}
          <div className="text-center lg:text-left">
            {/* Slide badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeSlide}`}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full mb-6 border border-gold/20"
              >
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">
                  {currentSlide.badge}
                </span>
                <span className="text-gold/60">{currentSlide.badgeIcon}</span>
              </motion.div>
            </AnimatePresence>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`heading-${activeSlide}`}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-[family-name:var(--font-heading)] leading-[1.1] mb-6"
              >
                {currentSlide.heading}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
              >
                {currentSlide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Trust badges - static, always visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 px-3.5 py-2 glass rounded-xl text-xs text-white/60 border border-white/5 hover:border-gold/20 hover:text-white/80 transition-all duration-300"
                >
                  <span className="text-gold">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ──── Right: Booking Form ──── */}
          <div>
            <BookingForm />
          </div>
        </div>
      </motion.div>

      {/* ──────────── BOTTOM FADE ──────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/50 to-transparent z-[2]" />

      {/* ──────────── CINEMATIC ZOOM KEYFRAMES ──────────── */}
      <style jsx>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.12);
          }
        }
      `}</style>
    </section>
  );
}
