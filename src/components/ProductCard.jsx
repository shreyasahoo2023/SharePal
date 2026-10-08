import { useState } from "react";
import { Gamepad2, Heart, Star } from "lucide-react";

function ProductCard({
  product,
  wishlist,
  onToggleWishlist,
  onConfirmRental,
  onQuickView,
  datesConfirmed,
  startDate,
  endDate,
  rentalDays,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [message, setMessage] = useState("");
  const isLiked = wishlist.some((item) => item.id === product.id);
  const totalPrice = product.per_day_rent * rentalDays;
  const currentDatesKey = `${datesConfirmed}:${startDate}:${endDate}`;

  const handleRental = () => {
    if (product.out_of_stock) return;
    if (!datesConfirmed || rentalDays < 1) {
      onConfirmRental(product);
      setMessage({
        text: "Select valid rental dates to continue.",
        datesKey: currentDatesKey,
      });
      return;
    }
    const added = onConfirmRental(product);
    if (!added) {
      setMessage({
        text: "Select valid rental dates to continue.",
        datesKey: currentDatesKey,
      });
      return;
    }
    setMessage({
      text: `${product.name} added to your bag.`,
      datesKey: currentDatesKey,
    });
  };

  return (
    <article className={`product-card ${product.out_of_stock ? "product-card-out-of-stock" : ""}`}>
      <div className="product-image-wrapper">
        {product.tag && (
          <span className={`product-tag product-tag-${product.tag.toLowerCase().replace(/\s+/g, "-")}`}>
            {product.tag}
          </span>
        )}
        <button
          type="button"
          className={`product-wishlist ${isLiked ? "liked" : ""}`}
          onClick={() => onToggleWishlist(product)}
          aria-label={
            isLiked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart size={19} fill={isLiked ? "currentColor" : "none"} />
        </button>
        {imageFailed ? (
          <div className="product-image-fallback" aria-label={product.name}>
            <Gamepad2 size={42} />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {product.out_of_stock && (
          <span className="out-of-stock-overlay">Out of Stock</span>
        )}
      </div>

      <div className="product-info">
        <button
          type="button"
          className="product-name-button"
          onClick={() => onQuickView(product)}
          aria-label={`View details for ${product.name}`}
        >
          <h3 className="product-name">{product.name}</h3>
        </button>
        <div className="product-meta">
          <span className="rating">
            <Star size={15} fill="currentColor" />
            {product.rating > 0 ? product.rating : "New"}
          </span>
          <span className="booked">
            {(product.booked_count || 0).toLocaleString()}+ booked
          </span>
        </div>
        <div className="product-bottom">
          <div className="price">
            {datesConfirmed ? (
              <>
                <strong>₹{product.per_day_rent}/day</strong>
                <span className="rental-total-price">
                  {rentalDays} {rentalDays === 1 ? "day" : "days"} · ₹{totalPrice} total
                </span>
                <span className="rental-date-range">
                  {startDate} → {endDate}
                </span>
              </>
            ) : (
              <span>Select dates to view price</span>
            )}
          </div>
          <button
            type="button"
            className={product.out_of_stock ? "rent-button disabled" : "rent-button"}
            disabled={product.out_of_stock}
            onClick={handleRental}
          >
            {product.out_of_stock
              ? "Out of Stock"
              : datesConfirmed
                ? "Add to bag"
                : "Select dates"}
          </button>
        </div>
        <button
          type="button"
          className="product-quick-view-button"
          onClick={() => onQuickView(product)}
        >
          View details
        </button>
        <span className="product-action-message" role="status" aria-live="polite">
          {message?.datesKey === currentDatesKey ? message.text : ""}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
