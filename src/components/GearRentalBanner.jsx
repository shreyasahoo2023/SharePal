import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

function GearRentalBanner({ featuredImage }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="gear-rental-banner">
      <div className="gear-banner-copy">
        <p className="section-label">JOIN THE SHARING COMMUNITY</p>
        <h2>Got gear you don&apos;t use anymore?</h2>
        <p>Rent Out Your Gear on SharePal</p>
        <a href="https://sharepal.in/" target="_blank" rel="noreferrer">
          Earn With Us <ArrowUpRight size={17} />
        </a>
      </div>
      {featuredImage && !imageFailed ? (
        <img
          src={featuredImage}
          alt="Gaming gear available to share"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="gear-banner-visual" aria-hidden="true">🎮</div>
      )}
    </section>
  );
}

export default GearRentalBanner;
