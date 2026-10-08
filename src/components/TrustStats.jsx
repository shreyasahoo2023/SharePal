import {
  ShieldCheck,
  Truck,
  Headphones,
  Gamepad2,
} from "lucide-react";

function TrustStats() {
  return (
    <section className="trust-section">

      <div className="trust-heading">
        <p className="section-label">WHY SHAREPAL?</p>

        <h2>Gaming without the commitment</h2>

        <p>
          Everything you need for an easy and reliable rental experience.
        </p>
      </div>

      <div className="trust-grid">

        <div className="trust-card">
          <div className="trust-icon">
            <Gamepad2 size={25} />
          </div>

          <strong>10,000+</strong>
          <span>Happy Customers</span>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            <ShieldCheck size={25} />
          </div>

          <strong>100%</strong>
          <span>Quality Checked</span>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            <Truck size={25} />
          </div>

          <strong>Fast</strong>
          <span>Doorstep Delivery</span>
        </div>

        <div className="trust-card">
          <div className="trust-icon">
            <Headphones size={25} />
          </div>

          <strong>24/7</strong>
          <span>Customer Support</span>
        </div>

      </div>

    </section>
  );
}

export default TrustStats;