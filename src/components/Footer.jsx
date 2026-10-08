function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>SharePal</h2>

          <p>
            Rent gaming gadgets, electronics and more.
            Get what you need without the commitment of buying.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <a href="#gaming">Gaming</a>
          <a href="#categories">Categories</a>
          <a href="#faq">FAQs</a>
        </div>

        <div className="footer-column">
          <h3>Help</h3>

          <a href="#faq">How it works</a>
          <a href="#faq">Rental information</a>
          <a href="#faq">Contact support</a>
        </div>

        <div className="footer-column">
          <h3>Location</h3>

          <p>Bangalore</p>
          <p>India</p>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 SharePal Clone. Built for assignment purposes.
        </p>

        <div>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;