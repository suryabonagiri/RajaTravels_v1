import {
  BUSINESS,
  BUS_TYPES,
  DESTINATIONS,
  FAQS,
  HARITHA_RESORTS,
  PACKAGES,
  SERVICES,
} from "./constants";

export type KnowledgeCategory =
  | "business"
  | "service"
  | "package"
  | "destination"
  | "bus"
  | "faq"
  | "resort"
  | "booking"
  | "contact";

export interface KnowledgeItem {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
}

function tokenize(...parts: string[]): string[] {
  const raw = parts.join(" ").toLowerCase();
  return Array.from(
    new Set(
      raw
        .replace(/[^\w\s₹+]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2)
    )
  );
}

export function buildKnowledgeBase(): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];

  items.push({
    id: "business-overview",
    category: "business",
    title: "About Raja Travels",
    content: `${BUSINESS.name} is an ${BUSINESS.tagline} based in Rajahmundry. ${BUSINESS.description}`,
    keywords: tokenize(
      BUSINESS.name,
      BUSINESS.tagline,
      "about company authorized agent rajahmundry"
    ),
  });

  items.push({
    id: "contact-info",
    category: "contact",
    title: "Contact details",
    content: `You can reach ${BUSINESS.name} at phone ${BUSINESS.phones.join(", ")}, email ${BUSINESS.email}, or WhatsApp. Address: ${BUSINESS.address}.`,
    keywords: tokenize(
      "contact phone call email whatsapp address location office rajahmundry",
      BUSINESS.email,
      ...BUSINESS.phones
    ),
  });

  items.push({
    id: "booking-help",
    category: "booking",
    title: "How to book",
    content:
      "You can book through the booking form on this website, call us, or message us on WhatsApp. Share your dates, pickup point, destination, and group size — we will confirm availability and pricing.",
    keywords: tokenize(
      "book booking reserve inquiry enquire how to book availability dates"
    ),
  });

  items.push({
    id: "bus-fleet",
    category: "bus",
    title: "Bus rental fleet",
    content: `We offer premium bus rental in these sizes: ${BUS_TYPES.join(", ")}. Ideal for family trips, marriages, corporate outings, and custom routes across Andhra Pradesh, Telangana, and neighboring states.`,
    keywords: tokenize(
      "bus rental hire fleet seater ac coach transport marriage wedding corporate",
      ...BUS_TYPES
    ),
  });

  for (const service of SERVICES) {
    items.push({
      id: `service-${service.id}`,
      category: "service",
      title: service.title,
      content: service.description,
      keywords: tokenize(service.title, service.description, service.id, "service"),
    });
  }

  for (const pkg of PACKAGES) {
    items.push({
      id: `package-${pkg.id}`,
      category: "package",
      title: pkg.title,
      content: `${pkg.title} (${pkg.duration}) to ${pkg.destination}. Adult price ${pkg.adultPrice}, child price ${pkg.childPrice}. Includes: ${pkg.highlights.join("; ")}.`,
      keywords: tokenize(
        pkg.title,
        pkg.destination,
        pkg.duration,
        pkg.adultPrice,
        pkg.childPrice,
        "package tour price cost",
        ...pkg.highlights
      ),
    });
  }

  for (const dest of DESTINATIONS) {
    items.push({
      id: `destination-${dest.id}`,
      category: "destination",
      title: dest.title,
      content: `${dest.title} — ${dest.subtitle}. ${dest.description} Highlights: ${dest.highlights.join(", ")}.`,
      keywords: tokenize(
        dest.title,
        dest.subtitle,
        dest.description,
        "destination place visit",
        ...dest.highlights
      ),
    });
  }

  items.push({
    id: "haritha-list",
    category: "resort",
    title: "Haritha Resorts we can book",
    content: `As an AP Tourism authorized agent, we can book Haritha Resorts including: ${HARITHA_RESORTS.map((r) => `${r.name} (${r.location})`).join("; ")}.`,
    keywords: tokenize(
      "haritha resort hotel stay accommodation booking",
      ...HARITHA_RESORTS.flatMap((r) => [r.name, r.location])
    ),
  });

  for (const faq of FAQS) {
    items.push({
      id: `faq-${tokenize(faq.question)
        .slice(0, 3)
        .join("-")}`,
      category: "faq",
      title: faq.question,
      content: faq.answer,
      keywords: tokenize(faq.question, faq.answer, "faq question"),
    });
  }

  items.push({
    id: "all-packages-summary",
    category: "package",
    title: "All tour packages",
    content: PACKAGES.map(
      (p) =>
        `• ${p.title} (${p.duration}) — Adult ${p.adultPrice}, Child ${p.childPrice}`
    ).join("\n"),
    keywords: tokenize(
      "all packages list tours prices rates package options what packages"
    ),
  });

  items.push({
    id: "all-services-summary",
    category: "service",
    title: "All services",
    content: SERVICES.map((s) => `• ${s.title}: ${s.description}`).join("\n"),
    keywords: tokenize(
      "all services list what do you offer options help services"
    ),
  });

  return items;
}

export const QUICK_PROMPTS = [
  "What services do you offer?",
  "Show me packages and prices",
  "Bus rental options",
  "Papikondalu tour details",
  "How can I book?",
  "Contact number",
];
