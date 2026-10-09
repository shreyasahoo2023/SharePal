import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  MessageCircle,
  Minus,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import productData from "../data/product-list.json";
import "./AIChatbot.css";

const WELCOME_MESSAGE =
  "Hi! 👋 I'm your SharePal assistant. How can I help you find the perfect gaming gear?";
const SUGGESTIONS = [
  "Show me PS5 consoles",
  "Find racing accessories",
  "How does renting work?",
  "How do I view rental prices?",
];

const FAQS = [
  {
    matches: ["view rental prices", "see prices", "price", "pricing", "cost"],
    answer:
      "Select delivery and pickup dates in the rental dates section first. Then browse products to see the per-day price and rental total for your chosen dates.",
    action: { label: "Choose rental dates", type: "dates" },
  },
  {
    matches: ["date", "delivery date", "pickup", "rental period"],
    answer:
      "Choose a delivery date and a pickup date in the rental dates section. The rental starts on your delivery date, and pickup must be at least one day later. Select both dates to see product prices.",
    action: { label: "Choose rental dates", type: "dates" },
  },
  {
    matches: ["shopping bag", "add to bag", "how does renting", "how can i rent"],
    answer:
      "Choose a product, select your delivery and pickup dates, and add it to your bag. Pickup must be at least one day after delivery. This demo does not place a real order or arrange delivery.",
  },
  {
    matches: ["wishlist", "favorite", "favourite"],
    answer:
      "Use the heart on a product card to add it to your wishlist. Open the heart button in the navigation bar to view your saved products.",
  },
  {
    matches: ["website", "sharepal", "who are you", "what can you do"],
    answer:
      "I’m SharePal’s rule-based shopping assistant for this gaming-rentals demo. I can help you explore the product catalog, check listed rental prices, and find information about dates and the rental bag.",
  },
];

function normalize(value) {
  return value.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ").trim();
}

function getProductMatches(question) {
  const query = normalize(question);
  const searchTerms = [];

  if (/\b(ps5|playstation)\b/.test(query)) searchTerms.push("ps5");
  if (/\b(xbox)\b/.test(query)) searchTerms.push("xbox");
  if (/\b(vr|oculus|meta quest)\b/.test(query)) searchTerms.push("vr");
  if (/\b(racing|wheel|steering)\b/.test(query)) searchTerms.push("racing");

  const exactMatches = productData.products.filter((product) =>
    normalize(product.name).includes(query),
  );
  if (exactMatches.length) return exactMatches;

  const terms =
    searchTerms.length > 0
      ? searchTerms
      : query.split(" ").filter((term) => term.length > 2);
  if (!terms.length) return [];

  return productData.products.filter((product) => {
    const searchable = normalize(`${product.name} ${product.tag || ""}`);
    return terms.some((term) => searchable.includes(term));
  });
}

function getReply(question) {
  const query = normalize(question);
  const products = getProductMatches(question);
  if (products.length) {
    const visibleProducts = products.slice(0, 4);
    const summaries = visibleProducts.map((product) => {
      const price =
        typeof product.per_day_rent === "number"
          ? `₹${product.per_day_rent}/day`
          : "price not listed";
      const availability = product.out_of_stock
        ? "currently out of stock"
        : "not marked out of stock in the catalog";
      return `${product.name} — ${price}; ${availability}.`;
    });
    const countNote =
      products.length > visibleProducts.length
        ? ` Showing ${visibleProducts.length} of ${products.length} matching products.`
        : "";

    return {
      text: `Here ${products.length === 1 ? "is" : "are"} ${products.length} matching ${products.length === 1 ? "product" : "products"} from the catalog:\n${summaries.join("\n")}${countNote}\nSelect rental dates on the page to see the price for your chosen duration.`,
      products,
      action: {
        label: "View products",
        type: "products",
        query: /\b(racing|wheel|steering)\b/.test(query)
          ? "racing"
          : /\b(xbox)\b/.test(query)
            ? "xbox"
            : /\b(vr|oculus|meta quest)\b/.test(query)
              ? "vr"
              : /\b(ps5|playstation)\b/.test(query)
                ? "ps5"
                : question,
      },
    };
  }

  const faq = FAQS.find((item) =>
    item.matches.some((term) => query.includes(normalize(term))),
  );
  if (faq) return { text: faq.answer, action: faq.action };

  return {
    text: "I can help find products in the gaming catalog, explain listed prices, and answer questions about rental dates or your bag. Try one of the suggestions below, or ask about a product or category.",
  };
}

function AIChatbot({ onViewProducts, onViewDates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iconMissing, setIconMissing] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, role: "assistant", text: WELCOME_MESSAGE },
  ]);
  const inputRef = useRef(null);
  const messageEndRef = useRef(null);
  const nextIdRef = useRef(1);
  const replyTimerRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => () => window.clearTimeout(replyTimerRef.current), []);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const userMessage = { id: nextIdRef.current++, role: "user", text };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    replyTimerRef.current = window.setTimeout(() => {
      const reply = getReply(text);
      setMessages((current) => [
        ...current,
        { id: nextIdRef.current++, role: "assistant", ...reply },
      ]);
      setIsLoading(false);
      replyTimerRef.current = null;
    }, 350);
  };

  const clearChat = () => {
    window.clearTimeout(replyTimerRef.current);
    replyTimerRef.current = null;
    setMessages([{ id: nextIdRef.current++, role: "assistant", text: WELCOME_MESSAGE }]);
    setInput("");
    setIsLoading(false);
  };

  const runAction = (action) => {
    if (action.type === "dates") {
      setIsOpen(false);
      setIsMinimized(false);
      onViewDates();
    } else if (action.type === "products") {
      setIsOpen(false);
      setIsMinimized(false);
      onViewProducts(action.query);
    }
  };

  return (
    <>
      {isOpen && !isMinimized && (
        <section className="ai-chat-panel" aria-label="SharePal AI Assistant">
          <header className="ai-chat-header">
            <div className="ai-chat-brand">
              <span className="ai-chat-brand-mark" aria-hidden="true"><Bot size={19} /></span>
              <div>
                <strong>SharePal AI Assistant</strong>
                <span>Your rental shopping assistant</span>
              </div>
            </div>
            <div className="ai-chat-header-actions">
              <button type="button" onClick={clearChat} aria-label="Clear chat" title="Clear chat">
                <RotateCcw size={17} />
              </button>
              <button type="button" onClick={() => setIsMinimized(true)} aria-label="Minimize chat" title="Minimize">
                <Minus size={18} />
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" title="Close">
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="ai-chat-messages" aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div className={`ai-chat-row ${message.role}`} key={message.id}>
                {message.role === "assistant" && (
                  <span className="ai-chat-avatar" aria-hidden="true"><Bot size={15} /></span>
                )}
                <div className="ai-chat-message-content">
                  <div className="ai-chat-bubble">
                    {message.text.split("\n").map((line, index) => (
                      <span key={`${message.id}-${index}`}>
                        {line}
                        {index < message.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {message.action && (
                    <button
                      type="button"
                      className="ai-chat-action"
                      onClick={() => runAction(message.action)}
                    >
                      {message.action.label}<ArrowUpRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="ai-chat-suggestions" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="ai-chat-row assistant">
                <span className="ai-chat-avatar" aria-hidden="true"><Bot size={15} /></span>
                <div className="ai-chat-bubble ai-chat-typing" role="status" aria-label="Assistant is responding">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <form
            className="ai-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about gaming rentals..."
              aria-label="Type your message"
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || isLoading}>
              <Send size={18} />
            </button>
          </form>
          <p className="ai-chat-disclaimer">Rule-based assistant · uses this page’s product catalog</p>
        </section>
      )}

      {isOpen && isMinimized && (
        <button
          type="button"
          className="ai-chat-minimized"
          onClick={() => setIsMinimized(false)}
          aria-label="Restore SharePal AI Assistant"
        >
          <MessageCircle size={17} /> SharePal AI <ArrowDown size={15} />
        </button>
      )}

      <button
        type="button"
        className={`ai-chat-launcher${iconMissing ? " icon-missing" : ""}`}
        onClick={() => {
          setIsOpen((open) => !open);
          setIsMinimized(false);
        }}
        aria-label="Open AI Chat Assistant"
        aria-expanded={isOpen && !isMinimized}
        title="Ask SharePal AI"
        data-tooltip="Ask SharePal AI"
      >
        {!iconMissing ? (
          <img
            src="/chatbot-icon.png"
            alt=""
            onError={() => setIconMissing(true)}
          />
        ) : (
          <span aria-hidden="true">AI</span>
        )}
      </button>
    </>
  );
}

export default AIChatbot;
