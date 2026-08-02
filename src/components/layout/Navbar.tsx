"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open (iOS/Android)
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    const id = href.replace(/^#/, "");
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    smoothScrollTo(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-gray-200/50 pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            : "bg-white/90 backdrop-blur-lg shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center cursor-pointer group min-w-0 shrink"
            aria-label="Raja Travels home"
          >
            <div className="relative h-10 w-[140px] sm:h-11 sm:w-[180px] md:h-12 md:w-[210px] transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/Raja_Travels_logo.png"
                alt="Raja Travels Logo"
                fill
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 210px"
                className="object-contain object-left"
                priority
              />
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="px-3 xl:px-4 py-2 text-sm text-primary font-bold hover:text-gold transition-colors duration-300 rounded-lg hover:bg-primary/5 cursor-pointer tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS.primaryPhone}`}
              className="inline-flex items-center justify-center gap-2 min-h-11 min-w-11 sm:min-w-0 sm:px-4 sm:py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold rounded-xl shimmer hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-shadow duration-300"
              aria-label={`Call ${BUSINESS.primaryPhone}`}
            >
              <FaPhoneAlt className="text-xs" />
              <span className="hidden sm:inline">Call Now</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 text-primary hover:text-gold transition-colors cursor-pointer bg-primary/5 rounded-lg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute top-0 right-0 w-[min(300px,88vw)] h-full bg-primary shadow-2xl flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
                <p className="text-white/70 text-sm font-semibold tracking-wide">
                  Menu
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center min-h-11 min-w-11 text-white/80 hover:text-gold rounded-lg"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.button
                      key={link.href}
                      type="button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full text-left px-4 py-3.5 min-h-12 text-white/85 hover:text-gold hover:bg-white/5 rounded-xl transition-all duration-200 font-medium cursor-pointer text-base"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <a
                    href={`tel:${BUSINESS.primaryPhone}`}
                    className="flex items-center justify-center gap-2 min-h-12 py-3 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold rounded-xl w-full"
                  >
                    <FaPhoneAlt className="text-sm" />
                    {BUSINESS.primaryPhone}
                  </a>
                  {BUSINESS.phones.slice(1).map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="flex items-center justify-center gap-2 min-h-11 py-2.5 text-white/75 hover:text-gold text-sm font-medium rounded-xl w-full border border-white/10"
                    >
                      <FaPhoneAlt className="text-xs" />
                      {phone}
                    </a>
                  ))}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
