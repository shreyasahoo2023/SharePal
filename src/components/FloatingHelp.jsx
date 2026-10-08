import { ArrowUp, CalendarDays, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

function FloatingHelp({ datesConfirmed, startDate, endDate }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showGoTop, setShowGoTop] = useState(false);
  const rentalDays =
    startDate && endDate
      ? Math.round(
          (new Date(`${endDate}T00:00:00`).getTime() -
            new Date(`${startDate}T00:00:00`).getTime()) /
            86400000,
        )
      : 0;

  useEffect(() => {
    const updateScrollState = () => setShowGoTop(window.scrollY > 480);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollToDates = () => {
    document.getElementById("rental-dates")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <button type="button" className="floating-rental-cta" onClick={scrollToDates}>
        <CalendarDays size={19} />
        {datesConfirmed
          ? `Dates selected · ${rentalDays} ${rentalDays === 1 ? "day" : "days"} — view prices`
          : "Select rental dates to view prices"}
      </button>

      {chatOpen && (
        <section className="chat-help-panel" aria-label="SharePal help panel">
          <div className="chat-help-header">
            <div>
              <strong>SharePal Help</strong>
              <span>Frontend demo · no live agent</span>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close help panel">
              <X size={19} />
            </button>
          </div>
          <p>Hi! How can we help you?</p>
          <div className="chat-help-topics">
            {["Rental Help", "Delivery", "Product Help"].map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
          {selectedTopic && (
            <p className="chat-help-response" role="status">
              For {selectedTopic.toLowerCase()}, explore the rental dates and FAQ on
              this page. This demo does not connect to live support.
            </p>
          )}
        </section>
      )}

      {showGoTop && (
        <button
          type="button"
          className="floating-go-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
        >
          <ArrowUp size={19} />
        </button>
      )}

      <button
        type="button"
        className="floating-chat-button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Close help chat" : "Open help chat"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? <X size={23} /> : <MessageCircle size={23} />}
      </button>
    </>
  );
}

export default FloatingHelp;
