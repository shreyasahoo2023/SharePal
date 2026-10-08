import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I rent from SharePal?",
      answer:
        "Choose a product, select your delivery and pickup dates, and add it to your bag. This page is a frontend demo, so it does not place a real order or arrange delivery.",
    },
    {
      question: "If I rent multiple products, do I need to extend the rental duration for all?",
      answer:
        "No. Each product rental has its own selected duration. Contact SharePal support for help managing a real booking.",
    },
    {
      question: "When does the rental start?",
      answer:
        "The rental period begins on the delivery date you select. Pickup must be at least one day after delivery.",
    },
    {
      question: "What happens if I damage the product?",
      answer:
        "Please contact SharePal support promptly if an item is damaged. Actual assessment and charges depend on the applicable rental terms.",
    },
    {
      question: "Can I cancel my rental?",
      answer:
        "Cancellation rules depend on the booking terms. No real booking is created by this demonstration site.",
    },
    {
      question: "How does delivery and pickup work?",
      answer:
        "SharePal coordinates doorstep delivery and pickup for eligible real rentals. This demo lets you explore dates and prices but does not arrange a delivery.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-heading">
        <p className="section-label">HAVE QUESTIONS?</p>

        <h2>Frequently Asked Questions</h2>

        <p>
          Helpful information about the SharePal rental experience.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? "open" : ""
            }`}
            key={faq.question}
          >
            <button
              type="button"
              className="faq-question"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <ChevronDown
                size={20}
                className="faq-icon"
              />
            </button>

            <div
              className={`faq-answer-wrap ${openIndex === index ? "open" : ""}`}
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              aria-hidden={openIndex !== index}
            >
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;