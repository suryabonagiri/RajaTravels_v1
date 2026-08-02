"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheck,
  FaPhoneAlt,
  FaWhatsapp,
  FaBus,
} from "react-icons/fa";
import { BUSINESS } from "@/lib/constants";
import {
  getBusTypesForService,
  getRelatedPackages,
  getResortsForService,
  type ServiceInfo,
} from "@/lib/services";
import { generateWhatsAppLink } from "@/lib/utils";
import PackageDetailBlock from "@/components/services/PackageDetailBlock";

export default function ServiceDetailContent({
  service,
}: {
  service: ServiceInfo;
}) {
  const busTypes = getBusTypesForService(service);
  const packages = getRelatedPackages(service);
  const resorts = getResortsForService(service);

  const whatsappLink = generateWhatsAppLink(
    `Hi! I'm interested in *${service.title}*. Please share more details and availability.`
  );

  return (
    <article className="bg-white">
      <section className="relative min-h-[42vh] md:min-h-[52vh] flex items-end overflow-hidden bg-primary-dark">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/65 to-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors mb-5"
          >
            <FaArrowLeft className="text-xs" />
            All services
          </Link>
          <p className="text-gold text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            {service.subtitle}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl text-white max-w-3xl leading-tight mb-4">
            {service.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-10 lg:gap-14">
          <div className="space-y-10">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-3">
                About this service
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-4">
                What you get
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <FaCheck className="text-emerald mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-4">
                Typical inclusions
              </h2>
              <ul className="space-y-2">
                {service.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {busTypes.length > 0 && (
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-4">
                  Available bus types
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {busTypes.map((type) => (
                    <div
                      key={type}
                      className="rounded-xl border border-gray-100 bg-surface px-4 py-4 text-center"
                    >
                      <FaBus className="mx-auto text-gold mb-2" />
                      <p className="text-sm font-semibold text-primary">{type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resorts.length > 0 && (
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-4">
                  Haritha resorts we can book
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {resorts.map((resort) => (
                    <li
                      key={resort.name}
                      className="rounded-xl border border-gray-100 bg-surface px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-primary">
                        {resort.name}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {resort.location}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {packages.length > 0 && (
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-2">
                  All packages in this service
                </h2>
                <p className="text-sm text-text-secondary mb-4">
                  {service.id === "papikondalu"
                    ? "Papikondalu boat tourism includes multiple day tours, night-stay options, and hotel stays — use the chips below to jump to any package."
                    : "Browse every package linked to this service. Open a chip to jump straight to its details."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {packages.map((pkg, i) => (
                    <a
                      key={pkg.id}
                      href={`#package-${pkg.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface px-3 py-1.5 text-xs font-semibold text-primary hover:border-gold/40 hover:bg-gold/10 transition-colors"
                    >
                      <span className="font-mono text-gold-dark">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {pkg.shortTitle || pkg.title}
                    </a>
                  ))}
                </div>

                <div className="space-y-6">
                  {packages.map((pkg) => (
                    <PackageDetailBlock key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 h-fit space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-surface p-6">
              <h3 className="font-semibold text-primary mb-2">Ideal for</h3>
              <ul className="space-y-2 mb-6">
                {service.idealFor.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-95 transition-opacity"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp inquiry
                </a>
                <a
                  href={`tel:${BUSINESS.primaryPhone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors"
                >
                  <FaPhoneAlt className="text-xs" />
                  Call {BUSINESS.primaryPhone}
                </a>
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary/15 text-primary font-semibold text-sm hover:border-gold/40 hover:bg-gold/5 transition-colors"
                >
                  Open booking form
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5 text-sm text-text-secondary leading-relaxed">
              Raja Travels is an AP Tourism authorized agent in Rajahmundry.
              Share your dates and group size — we’ll confirm availability and
              the best option for this service.
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
