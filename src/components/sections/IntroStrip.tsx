"use client";

import { motion } from "framer-motion";
import { BUSINESS, STATS } from "@/lib/constants";

export default function IntroStrip() {
  return (
    <section id="about" className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(0,71,158,0.06),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-gold font-semibold tracking-[0.2em] text-xs uppercase mb-4"
        >
          {BUSINESS.tagline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl text-primary leading-tight mb-5"
        >
          One journey. Every experience.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Scroll the Raja Route below — buses, Papikondalu boats, Maredumilli forests,
          Haritha stays, and group travel unfold one stop at a time.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
            >
              <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-primary">
                {stat.value}
                <span className="text-gold">{stat.suffix}</span>
              </p>
              <p className="text-xs md:text-sm text-text-secondary mt-1 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
