import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Bangalore",
      text: "The PS5 rental experience was really smooth. The console arrived in great condition and worked perfectly.",
    },
    {
      name: "Priya Das",
      location: "Bangalore",
      text: "Loved the convenience of renting instead of buying a console. The whole experience was simple and affordable.",
    },
    {
      name: "Arjun Mehta",
      location: "Bangalore",
      text: "Great collection of gaming products and very easy booking process. Would definitely rent again.",
    },
  ];
  const carouselTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">

      <div className="testimonials-heading">
        <p className="section-label">COMMUNITY STORIES</p>

        <h2>Made for great game nights</h2>

        <p>
          Illustrative stories about the convenience of renting — not verified customer reviews.
        </p>
      </div>

      <div className="testimonials-viewport" role="region" aria-label="Customer stories carousel">
        <div className="testimonials-track">
          {[false, true].map((isDuplicate) => (
            <div
              className="testimonials-set"
              key={isDuplicate ? "duplicate" : "original"}
              aria-hidden={isDuplicate || undefined}
            >
              {carouselTestimonials.map((testimonial, index) => (
                <article
                  className="testimonial-card"
                  key={`${testimonial.name}-${index}`}
                >
                  <div className="testimonial-source-rating">
                    <span className="google-review-mark" aria-label="Google">
                      G
                    </span>
                    <div
                      className="testimonial-rating"
                      aria-label="5 out of 5 stars, illustrative rating"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <p className="testimonial-text">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="testimonial-user">
                    <div className="avatar">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Testimonials;