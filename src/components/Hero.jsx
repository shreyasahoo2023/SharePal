function Hero() {
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

        <p className="section-label">
          GAMING GADGETS ON RENT
        </p>

        <h1>
          Game More.
          <br />
          Spend Less.
        </h1>

        <p>
          Rent premium gaming consoles, accessories and
          entertainment gadgets without buying them.
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

          <div
            style={{
              fontSize: "100px",
              lineHeight: "1",
            }}
            aria-label="Gaming controller"
            role="img"
          >
            🎮
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;