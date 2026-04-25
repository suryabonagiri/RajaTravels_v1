"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { BUSINESS } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Contact Us"
          subtitle="Have questions or ready to book? Reach out to us through any of the channels below."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Phone Cards */}
            <h3 className="text-lg font-bold text-primary mb-4">Call Us Directly</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {BUSINESS.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 shrink-0">
                    <FaPhoneAlt className="text-xs" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{phone}</span>
                </a>
              ))}
            </div>

            {/* Other contact */}
            <div className="space-y-4 mb-8">
              <a
                href={generateWhatsAppLink("Hi! I'd like to know more about Raja Travels services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shrink-0">
                  <FaWhatsapp className="text-lg" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">WhatsApp Us</div>
                  <div className="text-xs text-text-secondary">Quick response guaranteed</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">{BUSINESS.email}</div>
                  <div className="text-xs text-text-secondary">Email us anytime</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center text-emerald shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">Our Office</div>
                  <div className="text-xs text-text-secondary leading-relaxed">{BUSINESS.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">Working Hours</div>
                  <div className="text-xs text-text-secondary">Mon - Sun: 6:00 AM - 10:00 PM</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-bold text-primary mb-4">Find Us on Map</h3>
            <div className="flex-1 min-h-[400px] rounded-3xl overflow-hidden border border-gray-200 card-shadow">
              <iframe
                src={BUSINESS.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raja Travels Office Location - Rajahmundry"
              />
            </div>
            <p className="text-xs text-text-light mt-3 text-center">
              📍 {BUSINESS.address}
            </p>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Raja Travels (ap tourism authorised) papikondalu tourism 12-21-5, beside sri latha hosipital, Aryapuram, Rajamahendravaram")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs font-bold text-gold hover:text-primary transition-colors text-center inline-block mx-auto border-b border-gold/30 hover:border-primary/30"
            >
              View on Google Maps →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
