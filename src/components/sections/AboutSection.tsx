"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] py-16 sm:py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-x-clip"
          >
            <div className="relative brand-shape overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
                alt="Beautiful river cruise boat on Godavari representing AP Tourism experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-4 md:right-6 bg-white rounded-2xl p-4 sm:p-5 card-shadow-lg border border-gold/10 max-w-[calc(100%-1rem)]"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gold">10+</div>
                <div className="text-xs text-text-secondary font-medium mt-1">
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </motion.div>

            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/20 rounded-3xl -z-10" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              badge="About Us"
              title="Welcome to Raja Travels"
              center={false}
            />

            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base -mt-6">
              <p>
                Welcome to <strong className="text-primary">Raja Travels</strong>,
                your trusted partner for exploring the enchanting beauty of Andhra
                Pradesh. We are an{" "}
                <strong className="text-gold-dark">
                  AP Tourism Authorized Tours and Travels
                </strong>{" "}
                company dedicated to providing you with the most memorable and
                authentic travel experiences in this vibrant region.
              </p>
              <p>
                At Raja Travels, we specialize in three of Andhra Pradesh&apos;s hidden
                gems:{" "}
                <strong className="text-primary">
                  Papikondalu, Maredumilli, and APTDC Haritha Hotels & Resorts
                </strong>
                . These destinations offer a unique blend of natural beauty,
                cultural richness, and adventure, and we are here to help you
                uncover their secrets.
              </p>
              <p>
                Beyond our renowned tours, we take pride in offering{" "}
                <strong className="text-primary">
                  top-notch bus rental services
                </strong>{" "}
                for marriages, corporate events, family trips, and group tours
                across Andhra Pradesh and Telangana.
              </p>
            </div>

            {/* AP Tourism badge */}
            <div className="mt-6 flex items-center gap-3 p-4 bg-gold/5 rounded-xl border border-gold/15">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                AP
              </div>
              <div>
                <div className="text-sm font-bold text-primary">
                  AP Tourism Authorized Agent
                </div>
                <div className="text-xs text-text-secondary">
                  Officially certified by Andhra Pradesh Tourism
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8 bg-gradient-to-r from-primary via-primary-light to-primary rounded-3xl"
        >
          {STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              light
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
