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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-primary-dark"
    >
      {/* ──────────── VIDEO BACKGROUNDS ──────────── */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.video}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: activeSlide === index ? 1 : 0 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation:
                activeSlide === index
                  ? "heroZoom 20s ease-in-out infinite alternate"
                  : "none",
            }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary-dark/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-transparent to-primary-dark/50 z-[1]" />
      <div className="absolute inset-0 bg-pattern opacity-20 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-[2]" />

      {/* Slide indicators — tucked near bottom edge */}
      <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className="group relative cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-10 md:w-14 h-1 rounded-full bg-white/20 overflow-hidden">
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

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-14 md:pt-24 md:pb-12 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-10 xl:gap-12 items-center">
          <div className="text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeSlide}`}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 glass rounded-full mb-3 border border-gold/20"
              >
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                <span className="text-gold text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                  {currentSlide.badge}
                </span>
                <span className="text-gold/60 text-xs">{currentSlide.badgeIcon}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`heading-${activeSlide}`}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white font-[family-name:var(--font-heading)] leading-[1.12] mb-3"
              >
                {currentSlide.heading}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-white/55 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-4"
              >
                {currentSlide.subtitle}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 14 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg text-[11px] text-white/60 border border-white/5 hover:border-gold/20 hover:text-white/80 transition-all duration-300"
                >
                  <span className="text-gold text-xs">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="w-full max-w-xl mx-auto lg:max-w-none lg:mx-0">
            <BookingForm />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-white via-white/40 to-transparent z-[2]" />

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
