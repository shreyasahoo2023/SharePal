import { ArrowUp, Mail, MessageCircle, Share2, Users } from "lucide-react";

const columns = [
  {
    title: "SharePal",
    links: ["About", "Why SharePal", "Sitemap", "CarePal"],
  },
  {
    title: "Become a Pal",
    links: [
      "SharePal for Creators",
      "Careers",
      "SharePal for Brands",
      "Asset Funding Program",
      "Rent Your Gear",
    ],
  },
  {
    title: "Information",
    links: ["How it works?", "FAQs", "Verification", "Cancellation Policy", "Life at SharePal"],
  },
  {
    title: "Policies",
    links: ["Terms & Condition", "Shipping Policy", "Damage Policy", "Terms of Use", "Privacy Policy"],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>SharePal</h2>
          <p>
            Rent the things you need, when you need them. Discover a more flexible
            way to experience gaming and more.
          </p>
          <div className="footer-socials" aria-label="SharePal on social media">
            <a href="https://www.instagram.com/sharepal.in/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <Share2 size={19} />
            </a>
            <a href="https://www.linkedin.com/company/sharepal/" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Users size={19} />
            </a>
            <a href="https://www.facebook.com/sharepal.in/" aria-label="Facebook" target="_blank" rel="noreferrer">
              <MessageCircle size={19} />
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((label) => (
              <a
                key={label}
                href={
                  label === "FAQs" || label === "How it works?"
                    ? "#faq"
                    : label === "Why SharePal"
                      ? "#trust"
                      : "https://sharepal.in/"
                }
                target={label === "FAQs" || label === "How it works?" || label === "Why SharePal" ? undefined : "_blank"}
                rel={label === "FAQs" || label === "How it works?" || label === "Why SharePal" ? undefined : "noreferrer"}
              >
                {label}
              </a>
            ))}
          </div>
        ))}

        <div className="footer-column footer-contact">
          <h3>Need Help</h3>
          <a href="mailto:support@sharepal.in">Contact Support</a>
          <a href="mailto:support@sharepal.in">Contact Us</a>
          <a href="mailto:support@sharepal.in"><Mail size={15} /> support@sharepal.in</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SWNAC E-Kiraya Services Pvt Ltd</p>
        <span>Made with <span aria-label="love">♥</span> for India</span>
        <button
          type="button"
          className="go-up-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Go up <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
