"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { BUSINESS } from "@/lib/constants";

export default function AuthorityStrip() {
  return (
    <section
      aria-label="AP Tourism authorization"
      className="relative bg-white border-b border-gold/15"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-primary/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3 md:gap-4">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white shrink-0 shadow-[0_8px_20px_rgba(245,158,11,0.25)]">
              <FaShieldAlt className="text-lg" />
            </div>
            <div>
              <p className="text-sm md:text-base font-bold text-primary leading-snug">
                We are an AP Tourism Authorized Agent
              </p>
              <p className="text-xs md:text-sm text-text-secondary mt-0.5 leading-relaxed">
                Officially certified for Papikondalu boat tourism, Haritha
                Resort bookings, and AP Tourism packages — {BUSINESS.name},
                Rajahmundry.
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-text-secondary sm:justify-end">
            {["Authorized agent", "Official packages", "Trusted fleet"].map(
              (item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <FaCheckCircle className="text-gold text-sm shrink-0" />
                  <span className="font-medium text-primary/80">{item}</span>
                </li>
              )
            )}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
