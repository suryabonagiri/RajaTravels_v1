"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    smoothScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-200/50 ${isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] py-0.5"
          : "bg-white/80 backdrop-blur-lg shadow-sm py-0.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center cursor-pointer group"
          >
            <div className="relative w-[180px] h-[48px] md:w-[220px] md:h-[56px] transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/Raja_Travels_logo.png"
                alt="Raja Travels Logo"
                width={320}
                height={88}
                sizes="(max-width: 1080px) 240px, 320px"
                className="object-contain object-left"
                priority
                style={{ position: 'absolute', height: '212%', width: '100%', left: 0, top: '-26px', right: 0, bottom: 0, color: 'transparent' }}
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 xl:px-4 py-2 text-sm text-primary font-bold hover:text-gold transition-colors duration-300 rounded-lg hover:bg-primary/5 cursor-pointer tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.primaryPhone}`}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold rounded-xl shimmer hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-shadow duration-300"
            >
              <FaPhoneAlt className="text-xs" />
              Call Now
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-primary hover:text-gold transition-colors cursor-pointer bg-primary/5 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 w-[280px] h-full bg-primary shadow-2xl"
            >
              <div className="pt-20 px-6">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full text-left px-4 py-3 text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={`tel:${BUSINESS.primaryPhone}`}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold rounded-xl w-full"
                  >
                    <FaPhoneAlt className="text-sm" />
                    {BUSINESS.primaryPhone}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
