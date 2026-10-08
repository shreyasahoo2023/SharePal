import { useState } from "react";

const RECOMMENDATIONS_KEY = "sharepal-product-recommendations";

function RecommendationForm() {
  const [productName, setProductName] = useState("");
  const [useCase, setUseCase] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const recommendation = {
      productName: productName.trim(),
      useCase: useCase.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem(RECOMMENDATIONS_KEY) || "[]",
      );
      const recommendations = Array.isArray(existing) ? existing : [];
      localStorage.setItem(
        RECOMMENDATIONS_KEY,
        JSON.stringify([...recommendations, recommendation]),
      );
    } catch (storageError) {
      console.error("Unable to save the recommendation in this browser.", storageError);
      setError("We couldn't save your recommendation. Please try again.");
      return;
    }

    setProductName("");
    setUseCase("");
    setStatus("Thanks! Your recommendation has been submitted.");
  };

  return (
    <section className="recommendation-section" id="recommend">
      <div className="recommendation-copy">
        <p className="section-label">HELP US GROW THE COLLECTION</p>
        <h2>Can&apos;t find what you&apos;re looking for?</h2>
        <p>Tell us what gear we should launch next.</p>
      </div>
      <form className="recommendation-form" onSubmit={handleSubmit}>
        <label htmlFor="recommended-product">Enter product name</label>
        <input
          id="recommended-product"
          type="text"
          placeholder="e.g. VR headset"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
          maxLength={100}
        />
        <label htmlFor="recommendation-use">What will you use this for?</label>
        <textarea
          id="recommendation-use"
          placeholder="Tell us what you have in mind"
          value={useCase}
          onChange={(event) => setUseCase(event.target.value)}
          required
          rows={3}
          maxLength={500}
        />
        {error && <p className="recommendation-error" role="alert">{error}</p>}
        {status && <p className="recommendation-success" role="status">{status}</p>}
        <button type="submit">Submit Recommendation</button>
      </form>
    </section>
  );
}

export default RecommendationForm;
