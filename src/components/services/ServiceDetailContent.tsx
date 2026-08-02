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
import ForestPackageJourney from "@/components/services/ForestPackageJourney";
import FamilyPackageJourney from "@/components/services/FamilyPackageJourney";

type JourneyTheme = "river" | "forest" | "family";

function getJourneyTheme(serviceId: string): JourneyTheme | null {
  if (serviceId === "papikondalu") return "river";
  if (serviceId === "maredumilli") return "forest";
  if (serviceId === "group-tours") return "family";
  return null;
}

const THEME = {
  river: {
    articleBg: "bg-[#E8F7FC]",
    heroBg: "bg-[#023E8A]",
    backLink: "text-[#CAF0F8]/85 hover:text-white",
    eyebrow: "text-[#90E0EF]",
    heroText: "text-[#CAF0F8]/90",
    ctaSection: "border-[#0077B6]/12 bg-[#D6EBFA]",
    ctaCard: "border-[#48CAE4]/35 bg-white/90",
    ctaTitle: "text-[#023E8A]",
    ctaBody: "text-[#5B8BA8]",
    callBtn: "bg-[#0077B6] hover:bg-[#023E8A]",
    heroCopy:
      "Explore every Godavari package on the river route below — day tours, night stays, and hotel options.",
    ctaHeading: "Ready to book a Papikondalu package?",
  },
  forest: {
    articleBg: "bg-[#F1FAEE]",
    heroBg: "bg-[#081C15]",
    backLink: "text-[#B7E4C7]/80 hover:text-[#D8F3DC]",
    eyebrow: "text-[#95D5B2]",
    heroText: "text-[#D8F3DC]/85",
    ctaSection: "border-[#2D6A4F]/15 bg-[#E9F5EC]",
    ctaCard: "border-[#2D6A4F]/20 bg-white/90",
    ctaTitle: "text-[#1B4332]",
    ctaBody: "text-[#52796F]",
    callBtn: "bg-[#1B4332] hover:bg-[#2D6A4F]",
    heroCopy:
      "Follow the forest trail below — day tours and overnight eco stays deep in Maredumilli greenery.",
    ctaHeading: "Ready for a Maredumilli forest getaway?",
  },
  family: {
    articleBg: "bg-[#FFF5EE]",
    heroBg: "bg-[#43140F]",
    backLink: "text-[#FFD6A5]/90 hover:text-white",
    eyebrow: "text-[#F4A261]",
    heroText: "text-[#FFE8D6]/90",
    ctaSection: "border-[#E76F51]/15 bg-[#FFE8D6]",
    ctaCard: "border-[#F4A261]/40 bg-white/90",
    ctaTitle: "text-[#43140F]",
    ctaBody: "text-[#8B5E4B]",
    callBtn: "bg-[#C1121F] hover:bg-[#9B2226]",
    heroCopy:
      "Follow the family celebration route below — day outs, weekends, temple trips, and custom group plans.",
    ctaHeading: "Ready to plan a family or group trip?",
  },
} as const;

export default function ServiceDetailContent({
  service,
}: {
  service: ServiceInfo;
}) {
  const busTypes = getBusTypesForService(service);
  const packages = getRelatedPackages(service);
  const resorts = getResortsForService(service);
  const journeyTheme = getJourneyTheme(service.id);
  const theme = journeyTheme ? THEME[journeyTheme] : null;

  const whatsappLink = generateWhatsAppLink(
    `Hi! I'm interested in *${service.title}*. Please share more details and availability.`
  );

  return (
    <article className={theme?.articleBg ?? "bg-white"}>
      <section
        className={`relative min-h-[36vh] md:min-h-[42vh] flex items-end overflow-hidden ${
          theme?.heroBg ?? "bg-primary-dark"
        }`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {journeyTheme === "forest" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#081C15]/92 via-[#1B4332]/70 to-[#2D6A4F]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081C15] via-transparent to-[#1B4332]/45" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(149,213,178,0.18),transparent_45%)]" />
          </>
        ) : journeyTheme === "river" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#023E8A]/90 via-[#0077B6]/65 to-[#00B4D8]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#023E8A] via-transparent to-[#48CAE4]/25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(144,224,239,0.28),transparent_45%)]" />
          </>
        ) : journeyTheme === "family" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#43140F]/92 via-[#9B2226]/65 to-[#E76F51]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#43140F] via-transparent to-[#F4A261]/25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(244,162,97,0.28),transparent_45%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/65 to-primary-dark/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/40" />
          </>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 md:pb-14">
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 text-sm transition-colors mb-5 ${
              theme?.backLink ?? "text-white/70 hover:text-gold"
            }`}
          >
            <FaArrowLeft className="text-xs" />
            All services
          </Link>
          <p
            className={`text-xs font-semibold tracking-[0.18em] uppercase mb-3 ${
              theme?.eyebrow ?? "text-gold"
            }`}
          >
            {service.subtitle}
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl text-white max-w-3xl leading-tight mb-3">
            {service.title}
          </h1>
          <p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              theme?.heroText ?? "text-white/70"
            }`}
          >
            {theme?.heroCopy ?? service.description}
          </p>
        </div>
      </section>

      {journeyTheme && theme ? (
        <>
          {journeyTheme === "river" ? (
            <RiverPackageJourney packages={packages} />
          ) : journeyTheme === "forest" ? (
            <ForestPackageJourney packages={packages} />
          ) : (
            <FamilyPackageJourney packages={packages} />
          )}

          <section className={`border-t ${theme.ctaSection}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
              <div
                className={`rounded-2xl border p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${theme.ctaCard}`}
              >
                <div>
                  <p className={`font-semibold mb-1 ${theme.ctaTitle}`}>
                    {theme.ctaHeading}
                  </p>
                  <p className={`text-sm ${theme.ctaBody}`}>
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
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm ${theme.callBtn}`}
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
