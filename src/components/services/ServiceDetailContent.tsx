"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCheck, FaPhoneAlt, FaWhatsapp, FaBus } from "react-icons/fa";
import { BUSINESS } from "@/lib/constants";
import {
  getBusTypesForService,
  getRelatedPackages,
  getResortsForService,
  type ServiceInfo,
} from "@/lib/services";
import { generateWhatsAppLink } from "@/lib/utils";
import PackageDetailBlock from "@/components/services/PackageDetailBlock";
import RiverPackageJourney from "@/components/services/RiverPackageJourney";

export default function ServiceDetailContent({
  service,
}: {
  service: ServiceInfo;
}) {
  const busTypes = getBusTypesForService(service);
  const packages = getRelatedPackages(service);
  const resorts = getResortsForService(service);
  const isPapikondalu = service.id === "papikondalu";

  const whatsappLink = generateWhatsAppLink(
    `Hi! I'm interested in *${service.title}*. Please share more details and availability.`
  );

  return (
    <article className="bg-white">
      <section className="relative min-h-[36vh] md:min-h-[42vh] flex items-end overflow-hidden bg-primary-dark">
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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 md:pb-14">
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
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl text-white max-w-3xl leading-tight mb-3">
            {service.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            {isPapikondalu
              ? "Explore every Godavari package on the river route below — day tours, night stays, and hotel options."
              : service.description}
          </p>
        </div>
      </section>

      {isPapikondalu ? (
        <>
          <RiverPackageJourney packages={packages} />

          <section className="border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <div className="rounded-2xl border border-gray-100 bg-surface p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary mb-1">
                    Ready to book a Papikondalu package?
                  </p>
                  <p className="text-sm text-text-secondary">
                    Raja Travels is an AP Tourism authorized agent in Rajahmundry.
                    Share your dates and group size — we&apos;ll confirm the best option.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm"
                  >
                    <FaWhatsapp />
                    WhatsApp inquiry
                  </a>
                  <a
                    href={`tel:${BUSINESS.primaryPhone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm"
                  >
                    <FaPhoneAlt className="text-xs" />
                    Call {BUSINESS.primaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
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
                <div className="space-y-5">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary">
                    Packages
                  </h2>
                  {packages.map((pkg) => (
                    <PackageDetailBlock key={pkg.id} pkg={pkg} />
                  ))}
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
            </aside>
          </div>
        </section>
      )}
    </article>
  );
}
