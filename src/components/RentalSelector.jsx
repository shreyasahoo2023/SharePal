import { useState } from "react";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";

function RentalSelector() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  /*
   * Demo unavailable dates.
   * In a real application these would come
   * from your backend/database.
   */
  const unavailableDates = [
    "2026-10-15",
    "2026-10-16",
    "2026-10-17",
  ];

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    setStartDate(value);
    setAvailability(null);
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
    setAvailability(null);
    setError("");
  };

  const handleCheckAvailability = () => {
    setError("");
    setAvailability(null);

    if (!startDate || !endDate) {
      setError(
        "Please select both start and end dates."
      );
      return;
    }

    if (new Date(startDate) < new Date(today)) {
      setError(
        "Start date cannot be in the past."
      );
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError(
        "End date must be after the start date."
      );
      return;
    }

    /*
     * Check whether the selected rental period
     * overlaps any unavailable date.
     */
    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    const hasUnavailableDate =
      unavailableDates.some((date) => {
        const unavailable = new Date(
          `${date}T00:00:00`
        );

        return (
          unavailable >= start &&
          unavailable <= end
        );
      });

    if (hasUnavailableDate) {
      setAvailability("unavailable");
      return;
    }

    setAvailability("available");
  };

  const scrollToGaming = () => {
    document
      .getElementById("gaming")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="rental-selector">
      <div className="rental-selector-inner">
        <div className="rental-selector-heading">
          <p className="section-label">
            PLAN YOUR RENTAL
          </p>

          <h2>
            When do you need your gaming gear?
          </h2>

          <span>
            Select your rental dates and check
            availability.
          </span>
        </div>

        <div className="rental-selector-form">
          <div className="rental-selector-date">
            <label htmlFor="rental-start-date">
              <CalendarDays size={17} />
              Start Date
            </label>

            <input
              id="rental-start-date"
              type="date"
              min={today}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className="rental-selector-date">
            <label htmlFor="rental-end-date">
              <CalendarDays size={17} />
              End Date
            </label>

            <input
              id="rental-end-date"
              type="date"
              min={startDate || today}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>

          <button
            type="button"
            className="check-availability-button"
            onClick={handleCheckAvailability}
          >
            Check Availability
          </button>
        </div>

        {error && (
          <div className="availability-message availability-error">
            <XCircle size={19} />

            <span>{error}</span>
          </div>
        )}

        {availability === "available" && (
          <div className="availability-message availability-success">
            <CheckCircle2 size={19} />

            <div>
              <strong>
                Available for your dates!
              </strong>

              <span>
                {startDate} → {endDate}
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToGaming}
            >
              Browse Gaming
            </button>
          </div>
        )}

        {availability === "unavailable" && (
          <div className="availability-message availability-unavailable">
            <XCircle size={19} />

            <div>
              <strong>
                Not available for these dates
              </strong>

              <span>
                Please choose different rental dates.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RentalSelector;