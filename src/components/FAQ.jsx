import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does gaming gadget rental work?",
      answer:
        "Choose your gaming gadget, select your rental dates, and book the product. The gadget will be delivered to your selected location.",
    },
    {
      question: "What gaming consoles can I rent?",
      answer:
        "You can rent PS5 consoles, gaming bundles, controllers and popular gaming titles from our available collection.",
    },
    {
      question: "Can I choose the rental duration?",
      answer:
        "Yes. Select your preferred start and return dates while checking the availability of the product.",
    },
    {
      question: "What happens if a product is out of stock?",
      answer:
        "Products that are currently unavailable are marked as Out of Stock. You can check again later for availability.",
    },
    {
      question: "Can I extend my rental?",
      answer:
        "Rental extensions depend on product availability. Contact support before your return date to check whether an extension is possible.",
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
          Everything you need to know about renting gaming gadgets.
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
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <ChevronDown
                size={20}
                className="faq-icon"
              />
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;