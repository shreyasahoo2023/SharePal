import { useState } from "react";
import { Gamepad2 } from "lucide-react";

function Hero({ featuredImage }) {
  const [imageFailed, setImageFailed] = useState(false);

  const scrollToGaming = () => {
    document
      .getElementById("gaming")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="hero-section">

      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="hero-content">
        <p className="section-label">SHAREPAL · BANGALORE</p>
        <h1>Gaming Consoles</h1>
        <p>
          Rent the latest gaming gadgets from SharePal
          <br />
          PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>

        <div className="hero-buttons">

          {/* Explore Gaming */}
          <button
            className="primary-button"
            onClick={scrollToGaming}
          >
            Explore Gaming
          </button>

          {/* View All Products */}
          <button
            className="secondary-button"
            onClick={scrollToGaming}
          >
            View All Products
          </button>

        </div>

      </div>


      {/* 
          HERO VISUAL
      */}

      <div className="hero-visual">
        <div className="hero-circle">
          {featuredImage && !imageFailed ? (
            <img
              src={featuredImage}
              alt="PlayStation gaming console rental"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Gamepad2 className="hero-image-fallback" aria-hidden="true" />
          )}
        </div>
        <div className="hero-brand-strip" aria-label="Gaming platforms">
          <span>PLAYSTATION</span>
          <span>XBOX</span>
          <span>META QUEST</span>
        </div>
      </div>

    </section>
  );
}

export default Hero;