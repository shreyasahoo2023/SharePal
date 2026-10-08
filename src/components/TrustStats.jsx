function TrustStats() {
  const stats = [
    { value: "250Cr+", label: "Saved Together" },
    { value: "4.5M Kg", label: "CO₂E Emissions Saved" },
    { value: "100K+", label: "Products In Circulation" },
  ];

  return (
    <section className="trust-section" id="trust">
      <div className="trust-heading">
        <p className="section-label">SHARING GOES FURTHER</p>
        <h2>Better for your wallet. Better for the planet.</h2>
        <p>SharePal makes more use of the things we already own.</p>
      </div>
      <div className="trust-grid">
        {stats.map((stat) => (
          <div className="trust-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <p className="stats-disclaimer">
        SharePal figures shown for informational purposes; see SharePal for current reporting.
      </p>
    </section>
  );
}

export default TrustStats;
