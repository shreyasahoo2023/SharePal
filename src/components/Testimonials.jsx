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

  return (
    <section className="testimonials-section">

      <div className="testimonials-heading">
        <p className="section-label">CUSTOMER LOVE</p>

        <h2>What our customers say</h2>

        <p>
          Real experiences from people who rented gaming gadgets.
        </p>
      </div>

      <div className="testimonials-grid">

        {testimonials.map((testimonial) => (
          <article
            className="testimonial-card"
            key={testimonial.name}
          >

            <div className="testimonial-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="testimonial-text">
              "{testimonial.text}"
            </p>

            <div className="testimonial-user">
              <div className="avatar">
                {testimonial.name.charAt(0)}
              </div>

              <div>
                <strong>{testimonial.name}</strong>

                <span>
                  {testimonial.location}
                </span>
              </div>
            </div>

          </article>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;