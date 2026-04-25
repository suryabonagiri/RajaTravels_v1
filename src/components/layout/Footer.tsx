"use client";

import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import Image from "next/image";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import { smoothScrollTo, generateWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  const quickLinks = NAV_LINKS.slice(0, 4);
  const serviceLinks = NAV_LINKS.slice(4);

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden pt-20 pb-10">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 relative w-[260px] h-[75px] md:w-[320px] md:h-[90px] group">
              <Image
                src="/Raja_Travels_logo.png"
                alt="Raja Travels Logo"
                width={320}
                height={90}
                style={{ position: 'absolute', height: '246%', width: '100%', left: '-32px', top: '-69px', right: 0, bottom: 0, color: 'transparent' }}
                sizes="280px"
                className="object-contain object-left group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Your trusted partner for exploring the enchanting beauty of Andhra
              Pradesh. We provide premium luxury travel experiences with uncompromised comfort.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  href: BUSINESS.socialLinks.facebook,
                  label: "Facebook",
                },
                {
                  icon: <FaInstagram />,
                  href: BUSINESS.socialLinks.instagram,
                  label: "Instagram",
                },
                {
                  icon: <FaYoutube />,
                  href: BUSINESS.socialLinks.youtube,
                  label: "YouTube",
                },
                {
                  icon: <FaTwitter />,
                  href: BUSINESS.socialLinks.twitter,
                  label: "Twitter",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-gold hover:text-white transition-all duration-300 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() =>
                      smoothScrollTo(link.href.replace("#", ""))
                    }
                    className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() =>
                      smoothScrollTo(link.href.replace("#", ""))
                    }
                    className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>Bus Rental Services</li>
              <li>Papikondalu Boat Tourism</li>
              <li>Maredumilli Eco Tourism</li>
              <li>Haritha Resort Booking</li>
              <li>Group & Family Tours</li>
              <li>Corporate Trips</li>
              <li>Marriage Trip Buses</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-primary font-semibold mb-4 text-sm tracking-wide uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-secondary text-sm">
                <FaMapMarkerAlt className="text-gold mt-0.5 shrink-0" />
                <span>{BUSINESS.address}</span>
              </li>
              {BUSINESS.phones.slice(0, 2).map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
                  >
                    <FaPhoneAlt className="text-gold text-xs" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
                >
                  <FaEnvelope className="text-gold text-xs" />
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppLink("Hi! I'd like to know more about Raja Travels services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-emerald-600 transition-colors text-sm"
                >
                  <FaWhatsapp className="text-emerald-500 text-sm" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm text-center md:text-left">
            © {new Date().getFullYear()} Raja Travels | AP Tourism Authorized
            Agent. All rights reserved.
          </p>
          <button
            onClick={() => smoothScrollTo("home")}
            className="flex items-center gap-2 text-text-secondary hover:text-gold text-sm transition-colors cursor-pointer"
          >
            Back to Top <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
