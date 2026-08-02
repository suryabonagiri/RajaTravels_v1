"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaSpinner } from "react-icons/fa";
import { BUS_TYPES, BUSINESS } from "@/lib/constants";
import { generateWhatsAppLink, formatBookingMessage } from "@/lib/utils";

interface FormData {
  serviceType: string;
  startPoint: string;
  destination: string;
  journeyDate: string;
  busType: string;
  customerName: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = {
  serviceType: "",
  startPoint: "",
  destination: "",
  journeyDate: "",
  busType: "",
  customerName: "",
  phone: "",
  message: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () => {
    return (
      formData.serviceType !== "" &&
      formData.startPoint !== "" &&
      formData.destination !== "" &&
      formData.journeyDate !== "" &&
      formData.customerName !== "" &&
      formData.phone !== "" &&
      (formData.serviceType === "Bus Rental" ? formData.busType !== "" : true)
    );
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    const message = formatBookingMessage(formData);
    const link = generateWhatsAppLink(message);
    window.open(link, "_blank");
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setSending(true);

    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        BUSINESS.emailjs.serviceId,
        BUSINESS.emailjs.templateId,
        {
          service_type: formData.serviceType,
          from_name: formData.customerName,
          phone: formData.phone,
          start_point: formData.startPoint,
          destination: formData.destination,
          journey_date: formData.journeyDate,
          bus_type: formData.busType || "N/A",
          message: formData.message || "No additional message",
        },
        BUSINESS.emailjs.publicKey
      );
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 4000);
    } catch {
      const subject = encodeURIComponent(
        `Bus Booking Request - ${formData.customerName}`
      );
      const body = encodeURIComponent(formatBookingMessage(formData));
      window.open(`mailto:${BUSINESS.email}?subject=${subject}&body=${body}`);
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-gold/80 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 text-sm backdrop-blur-md outline-none";
  const labelClasses =
    "block text-white/75 text-[10px] font-semibold mb-1 tracking-wider uppercase";

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 max-w-xl mx-auto border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/25 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center mb-3 relative z-10">
        <span className="inline-block py-0.5 px-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5">
          Reserve Your Experience
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-heading)] tracking-tight leading-tight">
          Book Your Journey
        </h3>
        <p className="text-white/55 text-xs mt-1 max-w-sm mx-auto leading-snug">
          Select your service and we&apos;ll handle every detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10">
        <div className="sm:col-span-2">
          <label htmlFor="serviceType" className={labelClasses}>
            Service Required
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={(e) => {
              handleChange(e);
              if (e.target.value !== "Bus Rental") {
                setFormData((prev) => ({ ...prev, busType: "" }));
              }
            }}
            className={`${inputClasses} appearance-none cursor-pointer`}
            required
          >
            <option value="" className="text-gray-900">
              Select Service Type
            </option>
            <option value="Bus Rental" className="text-gray-900">
              Premium Bus Rental
            </option>
            <option value="Papikondalu Package" className="text-gray-900">
              Papikondalu Luxury Tour
            </option>
            <option value="Maredumilli Package" className="text-gray-900">
              Maredumilli Eco Tour
            </option>
            <option value="Bhadrachalam Package" className="text-gray-900">
              Bhadrachalam Divine Tour
            </option>
            <option value="Other Service" className="text-gray-900">
              Other Custom Travel
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="startPoint" className={labelClasses}>
            Pickup Location
          </label>
          <input
            id="startPoint"
            type="text"
            name="startPoint"
            placeholder="e.g., Rajahmundry"
            value={formData.startPoint}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="destination" className={labelClasses}>
            Destination
          </label>
          <input
            id="destination"
            type="text"
            name="destination"
            placeholder="e.g., Hyderabad"
            value={formData.destination}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="journeyDate" className={labelClasses}>
            Journey Date
          </label>
          <input
            id="journeyDate"
            type="date"
            name="journeyDate"
            value={formData.journeyDate}
            onChange={handleChange}
            className={`${inputClasses} [color-scheme:dark]`}
            required
          />
        </div>

        {formData.serviceType === "Bus Rental" ? (
          <div>
            <label htmlFor="busType" className={labelClasses}>
              Bus Type (Seater)
            </label>
            <select
              id="busType"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer`}
              required
            >
              <option value="" className="text-gray-900">
                Select Bus Type
              </option>
              {BUS_TYPES.map((type) => (
                <option key={type} value={type} className="text-gray-900">
                  {type}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}

        <div>
          <label htmlFor="customerName" className={labelClasses}>
            Your Name
          </label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={formData.customerName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Message (Optional)
          </label>
          <input
            id="message"
            type="text"
            name="message"
            placeholder="Any special requirements..."
            value={formData.message}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 relative z-10">
        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={!isFormValid()}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] disabled:opacity-40 disabled:cursor-not-allowed shimmer cursor-pointer text-xs tracking-wide"
        >
          <FaWhatsapp className="text-base" />
          WhatsApp Booking
        </button>

        <button
          type="button"
          onClick={handleEmail}
          disabled={!isFormValid() || sending}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] disabled:opacity-40 disabled:cursor-not-allowed shimmer cursor-pointer text-xs tracking-wide border border-white/10"
        >
          {sending ? (
            <FaSpinner className="text-base animate-spin" />
          ) : (
            <FaEnvelope className="text-base" />
          )}
          {emailSent ? "Sent Successfully ✓" : "Email Booking"}
        </button>
      </div>

      {emailSent && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-light text-center text-xs mt-2 relative z-10"
        >
          ✓ Booking details sent successfully!
        </motion.p>
      )}
    </motion.form>
  );
}
