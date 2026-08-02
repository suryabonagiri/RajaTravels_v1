import { BUSINESS, PACKAGES, SERVICES } from "./constants";
import {
  buildKnowledgeBase,
  type KnowledgeItem,
} from "./chatbotKnowledge";
import { generateWhatsAppLink } from "./utils";

export interface ChatReply {
  answer: string;
  matchedTitles: string[];
  suggestWhatsApp?: boolean;
  whatsappUrl?: string;
}

const knowledgeBase = buildKnowledgeBase();

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "are",
  "you",
  "your",
  "with",
  "from",
  "that",
  "this",
  "what",
  "which",
  "have",
  "how",
  "can",
  "please",
  "tell",
  "about",
  "me",
  "any",
  "do",
  "is",
  "a",
  "an",
  "of",
  "to",
  "in",
  "on",
  "our",
  "we",
]);

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s₹+]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function scoreItem(queryTokens: string[], item: KnowledgeItem): number {
  if (queryTokens.length === 0) return 0;
  let score = 0;
  const titleTokens = normalize(item.title);
  const keywordSet = new Set(item.keywords.map((k) => k.toLowerCase()));

  for (const token of queryTokens) {
    if (titleTokens.some((t) => t.includes(token) || token.includes(t))) {
      score += 4;
    }
    if (keywordSet.has(token)) {
      score += 3;
    } else if ([...keywordSet].some((k) => k.includes(token) || token.includes(k))) {
      score += 2;
    }
    if (item.content.toLowerCase().includes(token)) {
      score += 1;
    }
  }

  // Intent boosts
  const q = queryTokens.join(" ");
  if (
    (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("₹")) &&
    item.category === "package"
  ) {
    score += 3;
  }
  if (
    (q.includes("package") || q.includes("tour")) &&
    (item.category === "package" || item.id === "all-packages-summary")
  ) {
    score += 2;
  }
  if (
    (q.includes("service") || q.includes("offer")) &&
    (item.category === "service" || item.id === "all-services-summary")
  ) {
    score += 2;
  }
  if (
    (q.includes("bus") || q.includes("seater") || q.includes("hire")) &&
    (item.category === "bus" || item.id === "service-bus-rental")
  ) {
    score += 3;
  }
  if (
    (q.includes("contact") ||
      q.includes("phone") ||
      q.includes("call") ||
      q.includes("whatsapp") ||
      q.includes("email") ||
      q.includes("address")) &&
    item.category === "contact"
  ) {
    score += 4;
  }
  if (
    (q.includes("book") || q.includes("booking") || q.includes("reserve")) &&
    item.category === "booking"
  ) {
    score += 3;
  }

  return score;
}

function isGreeting(query: string): boolean {
  return /^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening)|hola)\b/i.test(
    query.trim()
  );
}

function isThanks(query: string): boolean {
  return /^(thanks|thank you|thx|ok|okay|great|cool)\b/i.test(query.trim());
}

function formatTopMatches(matches: KnowledgeItem[]): string {
  if (matches.length === 1) {
    return `**${matches[0].title}**\n${matches[0].content}`;
  }

  return matches
    .map((m, i) => `${i + 1}. **${m.title}**\n${m.content}`)
    .join("\n\n");
}

function fallbackReply(query: string): ChatReply {
  const whatsappUrl = generateWhatsAppLink(
    `Hi Raja Travels! I have a question: ${query}`
  );
  return {
    answer: `I couldn't find an exact match for that in our website content.\n\nI can help with:\n• Services (${SERVICES.length} offerings)\n• Tour packages & prices (${PACKAGES.length} packages)\n• Bus rental sizes\n• Destinations & Haritha resorts\n• Booking & contact details\n\nOr chat with our team on WhatsApp for a custom quote.`,
    matchedTitles: [],
    suggestWhatsApp: true,
    whatsappUrl,
  };
}

export function getBotReply(userMessage: string): ChatReply {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return {
      answer: "Please type your question about our services, packages, or booking.",
      matchedTitles: [],
    };
  }

  if (isGreeting(trimmed)) {
    return {
      answer: `Hello! Welcome to ${BUSINESS.name} — ${BUSINESS.tagline}.\n\nAsk me about services, package prices, bus rentals, destinations, or how to book. You can also tap a quick question below.`,
      matchedTitles: [],
    };
  }

  if (isThanks(trimmed)) {
    return {
      answer: `You're welcome! If you need anything else — packages, bus hire, or booking help — just ask. Call us anytime at ${BUSINESS.primaryPhone}.`,
      matchedTitles: [],
    };
  }

  const tokens = normalize(trimmed);
  const ranked = knowledgeBase
    .map((item) => ({ item, score: scoreItem(tokens, item) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0 || ranked[0].score < 3) {
    return fallbackReply(trimmed);
  }

  const topScore = ranked[0].score;
  const top = ranked
    .filter((r) => r.score >= topScore * 0.65 && r.score >= 3)
    .slice(0, 3)
    .map((r) => r.item);

  // Prefer summary cards when user asks broadly
  const broadPackage = /package|packages|price|prices|cost|tour list/i.test(trimmed);
  const broadService = /services|what do you offer|what all/i.test(trimmed);
  if (broadPackage) {
    const summary = knowledgeBase.find((k) => k.id === "all-packages-summary");
    if (summary) {
      return {
        answer: `${summary.content}\n\nAsk about any package by name for full inclusions.`,
        matchedTitles: [summary.title],
      };
    }
  }
  if (broadService) {
    const summary = knowledgeBase.find((k) => k.id === "all-services-summary");
    if (summary) {
      return {
        answer: `${summary.content}\n\nWant details on a specific service or package? Just name it.`,
        matchedTitles: [summary.title],
      };
    }
  }

  const answer = `${formatTopMatches(top)}\n\nNeed a booking? Call ${BUSINESS.primaryPhone} or use WhatsApp / the booking form on this page.`;

  return {
    answer,
    matchedTitles: top.map((t) => t.title),
    suggestWhatsApp: top.some((t) =>
      ["booking", "contact", "bus"].includes(t.category)
    ),
    whatsappUrl: generateWhatsAppLink(
      `Hi! I was asking about: ${top.map((t) => t.title).join(", ")}. Please help me book.`
    ),
  };
}

export function getWelcomeMessage(): string {
  return `Hi! I'm the Raja Travels assistant.\n\nI can answer questions about our services, tour packages & prices, bus rentals, destinations, and booking — using the information on this website.\n\nWhat would you like to know?`;
}
