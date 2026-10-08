import { useEffect, useState } from "react";
import { CalendarDays, Heart, Star, X } from "lucide-react";

function ProductQuickView({
  product,
  isLiked,
  onToggleWishlist,
  onAddToBag,
  datesConfirmed,
  startDate,
  endDate,
  rentalDays,
  onClose,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [rentalError, setRentalError] = useState("");
  const total = product.per_day_rent * rentalDays;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleAddToBag = () => {
    setRentalError("");
    if (!datesConfirmed || rentalDays < 1) {
      setRentalError("Select valid delivery and pickup dates before adding this rental.");
      return;
    }
    onAddToBag(product);
  };

  return (
    <div
      className="quick-view-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <header className="quick-view-header">
          <h2>Product details</h2>
          <button type="button" onClick={onClose} aria-label="Close product details">
            <X size={21} />
          </button>
        </header>
        <div className="quick-view-content">
          <div className="quick-view-image">
            {!imageFailed ? (
              <img src={product.image} alt={product.name} onError={() => setImageFailed(true)} />
            ) : (
              <span aria-label={product.name}>🎮</span>
            )}
            {product.tag && <span className="product-tag">{product.tag}</span>}
          </div>
          <div className="quick-view-details">
            <h3 id="quick-view-title">{product.name}</h3>
            <div className="quick-view-meta">
              {product.rating > 0 && (
                <span><Star size={16} fill="currentColor" /> {product.rating}</span>
              )}
              <span>{(product.booked_count || 0).toLocaleString()}+ booked</span>
            </div>
            <p className="quick-view-availability">
              <span className={product.out_of_stock ? "availability-dot unavailable" : "availability-dot"} />
              {product.out_of_stock ? "Out of Stock" : "Available to rent"}
            </p>
            <div className="quick-view-rental-summary">
              <div>
                <span>Rental dates</span>
                <strong>
                  {datesConfirmed ? (
                    <><CalendarDays size={15} /> {startDate} → {endDate}</>
                  ) : "Select dates to view price"}
                </strong>
              </div>
              <div>
                <span>Daily rental</span>
                <strong>{datesConfirmed ? `₹${product.per_day_rent}/day` : "—"}</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>
                  {datesConfirmed
                    ? `${rentalDays} ${rentalDays === 1 ? "day" : "days"}`
                    : "—"}
                </strong>
              </div>
              <div className="quick-view-total">
                <span>Total rental price</span>
                <strong>{datesConfirmed ? `₹${total}` : "—"}</strong>
              </div>
            </div>
            <div className="quick-view-actions">
              <button
                type="button"
                className="quick-view-wishlist"
                onClick={() => onToggleWishlist(product)}
              >
                <Heart size={17} fill={isLiked ? "currentColor" : "none"} />
                {isLiked ? "Wishlisted" : "Wishlist"}
              </button>
              <button
                type="button"
                className="quick-view-rent"
                disabled={product.out_of_stock}
                onClick={handleAddToBag}
              >
                {product.out_of_stock ? "Out of Stock" : "Add to Rental Bag"}
              </button>
            </div>
            {rentalError && (
              <p className="quick-view-rental-error" role="alert">{rentalError}</p>
            )}
            {!datesConfirmed && (
              <button
                type="button"
                className="quick-view-hint quick-view-choose-dates"
                onClick={() => {
                  onClose();
                  window.setTimeout(() => {
                    document.getElementById("rental-dates")?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 0);
                }}
              >
                Choose rental dates to continue
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductQuickView;
