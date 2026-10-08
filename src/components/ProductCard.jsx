import { Heart, Star, X, CalendarDays } from "lucide-react";
import { useState } from "react";

function ProductCard({
  product,
  wishlist,
  onToggleWishlist,
  onConfirmRental,
}) {
  const [isRentModalOpen, setIsRentModalOpen] =
    useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const [error, setError] = useState("");

  const isLiked = wishlist.some(
    (item) => item.id === product.id
  );

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  const calculateDays = () => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    const difference =
      end.getTime() - start.getTime();

    const days = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );

    return days >= 0 ? days + 1 : 0;
  };

  const rentalDays = calculateDays();

  const totalPrice =
    product.per_day_rent * rentalDays;

  const handleRentNow = () => {
    setBookingConfirmed(false);
    setStartDate("");
    setEndDate("");
    setError("");
    setIsRentModalOpen(true);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    setStartDate(value);
    setError("");

    if (
      endDate &&
      new Date(endDate) < new Date(value)
    ) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setError("");
  };

  const handleConfirmRental = () => {
    setError("");

    if (!startDate || !endDate) {
      setError(
        "Please select both start and end dates."
      );
      return;
    }

    if (
      new Date(startDate) < new Date(today)
    ) {
      setError(
        "Start date cannot be in the past."
      );
      return;
    }

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {
      setError(
        "End date must be after the start date."
      );
      return;
    }

    if (rentalDays <= 0) {
      setError(
        "Please select a valid rental period."
      );
      return;
    }

    const rental = {
      product,
      startDate,
      endDate,
      rentalDays,
      totalPrice,
    };

    if (onConfirmRental) {
      onConfirmRental(rental);
    }

    setBookingConfirmed(true);
  };

  const closeModal = () => {
    setIsRentModalOpen(false);
    setBookingConfirmed(false);
    setError("");
  };

  return (
    <>
      <article className="product-card">
        <div className="product-image-wrapper">
          {product.tag && (
            <span className="product-tag">
              {product.tag}
            </span>
          )}

          <button
            type="button"
            className={`product-wishlist ${
              isLiked ? "liked" : ""
            }`}
            onClick={() =>
              onToggleWishlist(product)
            }
            aria-label={
              isLiked
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
          >
            <Heart
              size={19}
              fill={
                isLiked
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">
            {product.name}
          </h3>

          <div className="product-meta">
            {product.rating > 0 ? (
              <span className="rating">
                <Star
                  size={15}
                  fill="currentColor"
                />
                {product.rating}
              </span>
            ) : (
              <span className="rating">
                New
              </span>
            )}

            <span className="booked">
              {product.booked_count.toLocaleString()}
              + booked
            </span>
          </div>

          <div className="product-bottom">
            <div className="price">
              <strong>
                ₹{product.per_day_rent}
              </strong>

              <span>/day</span>
            </div>

            <button
              type="button"
              className={
                product.out_of_stock
                  ? "rent-button disabled"
                  : "rent-button"
              }
              disabled={product.out_of_stock}
              onClick={handleRentNow}
            >
              {product.out_of_stock
                ? "Out of Stock"
                : "Rent Now"}
            </button>
          </div>
        </div>
      </article>

      {isRentModalOpen && (
        <div
          className="rental-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="rental-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="rental-modal-header">
              <h2>Rent This Product</h2>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeModal}
                aria-label="Close rental modal"
              >
                <X size={21} />
              </button>
            </div>

            {!bookingConfirmed ? (
              <>
                <div className="rental-product">
                  <div className="rental-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="rental-product-info">
                    <h3>
                      {product.name}
                    </h3>

                    <div className="rental-product-rating">
                      {product.rating > 0 && (
                        <>
                          <Star
                            size={15}
                            fill="currentColor"
                          />
                          {product.rating}
                        </>
                      )}
                    </div>

                    <p>
                      ₹{product.per_day_rent}
                      <span>/day</span>
                    </p>
                  </div>
                </div>

                <div className="rental-dates">
                  <div className="rental-date-input">
                    <label
                      htmlFor={`start-${product.id}`}
                    >
                      <CalendarDays size={15} />
                      Start Date
                    </label>

                    <input
                      id={`start-${product.id}`}
                      type="date"
                      min={today}
                      value={startDate}
                      onChange={
                        handleStartDateChange
                      }
                    />
                  </div>

                  <div className="rental-date-input">
                    <label
                      htmlFor={`end-${product.id}`}
                    >
                      <CalendarDays size={15} />
                      End Date
                    </label>

                    <input
                      id={`end-${product.id}`}
                      type="date"
                      min={startDate || today}
                      value={endDate}
                      onChange={
                        handleEndDateChange
                      }
                    />
                  </div>
                </div>

                {error && (
                  <div className="rental-error">
                    {error}
                  </div>
                )}

                <div className="rental-summary">
                  <div>
                    <span>
                      Rental duration
                    </span>

                    <strong>
                      {rentalDays > 0
                        ? `${rentalDays} ${
                            rentalDays === 1
                              ? "day"
                              : "days"
                          }`
                        : "Select dates"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Price per day
                    </span>

                    <strong>
                      ₹{product.per_day_rent}
                    </strong>
                  </div>

                  <div className="rental-total">
                    <span>Total</span>

                    <strong>
                      {totalPrice > 0
                        ? `₹${totalPrice}`
                        : "—"}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="confirm-rental-button"
                  onClick={
                    handleConfirmRental
                  }
                >
                  Confirm Rental
                </button>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-icon">
                  ✓
                </div>

                <h3>
                  Rental Request Confirmed!
                </h3>

                <p>
                  Your rental request for
                  <strong>
                    {" "}
                    {product.name}
                  </strong>{" "}
                  has been received.
                </p>

                <div className="success-details">
                  <div>
                    <span>
                      Rental period
                    </span>

                    <strong>
                      {startDate} → {endDate}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Rental duration
                    </span>

                    <strong>
                      {rentalDays}{" "}
                      {rentalDays === 1
                        ? "day"
                        : "days"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Total amount
                    </span>

                    <strong>
                      ₹{totalPrice}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="confirm-rental-button"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;