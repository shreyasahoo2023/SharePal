import { CalendarDays, CheckCircle2 } from "lucide-react";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function RentalSelector({
  startDate,
  endDate,
  onDateChange,
  onConfirm,
  confirmed,
  rentalDays,
  error,
}) {
  return (
    <section className="rental-selector" id="rental-dates">
      <div className="rental-selector-inner">
        <div className="rental-selector-heading">
          <p className="section-label">PLAN YOUR RENTAL</p>
          <h2>When do you need your gaming gear?</h2>
          <span>Choose your delivery and pickup dates to see rental prices.</span>
        </div>

        <div className="rental-selector-form">
          <div className="rental-selector-date">
            <label htmlFor="rental-start-date">
              <CalendarDays size={17} />
              Delivery date
            </label>
            <input
              id="rental-start-date"
              type="date"
              min={getTodayDate()}
              value={startDate}
              onChange={(event) => onDateChange("start", event.target.value)}
            />
          </div>
          <div className="rental-selector-date">
            <label htmlFor="rental-end-date">
              <CalendarDays size={17} />
              Pickup date
            </label>
            <input
              id="rental-end-date"
              type="date"
              min={startDate || getTodayDate()}
              value={endDate}
              onChange={(event) => onDateChange("end", event.target.value)}
            />
          </div>
          <button
            type="button"
            className="check-availability-button"
            onClick={onConfirm}
          >
            Select dates
          </button>
        </div>

        {error && (
          <p className="availability-message availability-error" role="alert">
            {error}
          </p>
        )}
        {confirmed && (
          <div className="availability-message availability-success" role="status">
            <CheckCircle2 size={19} />
            <span>
              Dates selected: {startDate} → {endDate} · {rentalDays}{" "}
              {rentalDays === 1 ? "day" : "days"}. Product prices are ready.
            </span>
            <button
              type="button"
              onClick={() =>
                document.getElementById("gaming")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              Browse products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default RentalSelector;
