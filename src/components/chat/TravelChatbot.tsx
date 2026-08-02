"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaWhatsapp,
  FaGripLines,
  FaRobot,
} from "react-icons/fa";
import { getBotReply, getWelcomeMessage } from "@/lib/chatbotEngine";
import { QUICK_PROMPTS } from "@/lib/chatbotKnowledge";
import { BUSINESS } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";

type Role = "bot" | "user";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  whatsappUrl?: string;
}

function renderRichText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i} className="block">
        {parts}
        {i < text.split("\n").length - 1 ? <br /> : null}
      </span>
    );
  });
}

const STORAGE_KEY = "raja-chatbot-pos";
// Sit above the fixed WhatsApp button (bottom + 56px + gap + safe area)
const DEFAULT_POS = { x: 20, y: 100 };

function readStoredPos(): { x: number; y: number } {
  if (typeof window === "undefined") return DEFAULT_POS;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_POS;
    const parsed = JSON.parse(raw) as { x: number; y: number };
    if (typeof parsed.x !== "number" || typeof parsed.y !== "number") {
      return DEFAULT_POS;
    }
    const maxX = Math.max(12, window.innerWidth - 72);
    const maxY = Math.max(12, window.innerHeight - 72);
    return {
      x: Math.min(Math.max(12, parsed.x), maxX),
      y: Math.min(Math.max(12, parsed.y), maxY),
    };
  } catch {
    return DEFAULT_POS;
  }
}

function clampToViewport(x: number, y: number) {
  if (typeof window === "undefined") return { x, y };
  const safeRight = 12;
  const safeBottom = 12;
  const maxX = Math.max(safeRight, window.innerWidth - 72);
  const maxY = Math.max(safeBottom, window.innerHeight - 72);
  return {
    x: Math.min(Math.max(safeRight, x), maxX),
    y: Math.min(Math.max(safeBottom, y), maxY),
  };
}

export default function TravelChatbot() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "bot", text: getWelcomeMessage() },
  ]);
  const [pos, setPos] = useState(readStoredPos);
  const [dragging, setDragging] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const posRef = useRef(pos);
  const dragOffset = useRef({ x: 0, y: 0 });
  const movedDuringDrag = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const persistPos = useCallback((next: { x: number; y: number }) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, typing]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    movedDuringDrag.current = false;
    setDragging(true);
    dragOffset.current = {
      x: window.innerWidth - e.clientX - posRef.current.x,
      y: window.innerHeight - e.clientY - posRef.current.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    movedDuringDrag.current = true;
    const next = clampToViewport(
      window.innerWidth - e.clientX - dragOffset.current.x,
      window.innerHeight - e.clientY - dragOffset.current.y
    );
    posRef.current = next;
    setPos(next);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setDragging(false);
    persistPos(posRef.current);
    if (!movedDuringDrag.current) {
      setOpen((v) => !v);
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const pushBotReply = useCallback((question: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: question,
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    window.setTimeout(() => {
      const reply = getBotReply(question);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: reply.answer,
          whatsappUrl: reply.suggestWhatsApp ? reply.whatsappUrl : undefined,
        },
      ]);
      setTyping(false);
    }, 350 + Math.min(900, question.length * 8));
  }, []);

  const handleSend = (text?: string) => {
    const question = (text ?? input).trim();
    if (!question || typing) return;
    setInput("");
    pushBotReply(question);
  };

  const panelStyle = isNarrow
    ? ({
        left: 12,
        right: 12,
        bottom: Math.max(pos.y + 72, 88),
      } as const)
    : ({
        right: pos.x,
        bottom: pos.y + 72,
      } as const);

  const launcherStyle = {
    right: pos.x,
    bottom: pos.y,
  } as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Raja Travels assistant"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={panelStyle}
            className="pointer-events-auto absolute w-auto sm:w-[min(380px,calc(100vw-24px))] h-[min(560px,calc(100dvh-8rem-env(safe-area-inset-bottom,0px)))] sm:h-[min(560px,calc(100dvh-120px))] flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-white shadow-[0_20px_60px_rgba(0,45,102,0.28)]"
          >
            {/* Header — also draggable feel via grip note */}
            <div className="shrink-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light px-4 py-3 text-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 border border-gold/40 text-gold shrink-0">
                    <FaRobot className="text-lg" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      Raja Travels Assistant
                    </p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      Services · Packages · Booking help
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-white/55 flex items-center gap-1.5">
                <FaGripLines className="opacity-70" />
                Drag the chat button to move it anywhere on the page
              </p>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-surface"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white text-text-primary border border-gray-100 shadow-sm rounded-bl-md"
                    }`}
                  >
                    {msg.role === "bot" ? renderRichText(msg.text) : msg.text}
                    {msg.whatsappUrl && (
                      <a
                        href={msg.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:text-emerald-light"
                      >
                        <FaWhatsapp />
                        Continue on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="shrink-0 px-3 pt-2 pb-1 bg-white border-t border-gray-100 overflow-x-auto">
              <div className="flex gap-2 min-w-max pb-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={typing}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] whitespace-nowrap px-2.5 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-primary hover:border-gold/40 hover:bg-gold/10 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Composer */}
            <form
              className="shrink-0 p-3 bg-white border-t border-gray-100 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about packages or booking…"
                className="flex-1 min-w-0 rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-text-light"
                aria-label="Type your question"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="h-10 w-10 rounded-xl bg-gold hover:bg-gold-light text-primary-dark flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>

            <div className="shrink-0 px-3 pb-3 bg-white">
              <a
                href={generateWhatsAppLink(
                  `Hi! I'm chatting on the ${BUSINESS.name} website and need help.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-xs font-medium text-primary/70 hover:text-primary py-1.5"
              >
                <FaWhatsapp className="text-emerald" />
                Prefer a human? WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable launcher — always visible */}
      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close Raja Travels assistant" : "Open Raja Travels assistant"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={launcherStyle}
        className={`pointer-events-auto absolute h-14 w-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_28px_rgba(0,45,102,0.35)] border border-gold/40 cursor-grab active:cursor-grabbing touch-none select-none ${
          open
            ? "bg-primary-dark"
            : "bg-gradient-to-br from-primary via-primary-light to-primary-dark"
        } ${dragging ? "scale-105" : ""}`}
        whileHover={{ scale: dragging ? 1.05 : 1.08 }}
      >
        {open ? <FaTimes className="text-lg" /> : <FaComments className="text-xl" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gold border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
