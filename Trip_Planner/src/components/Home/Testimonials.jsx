import React, { useRef } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonialsRef = useRef(null);

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Adventure Traveler",
      content: "Travelo made my dream trip to Bali a reality. The itinerary was perfectly planned and everything went smoothly!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sarah Miller",
      role: "Family Traveler",
      content: "Booking our family vacation has never been easier. The hotel recommendations were spot on and kid-friendly!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Chen",
      role: "Business Traveler",
      content: "As a frequent business traveler, Travelo's efficient booking system saves me hours every month. Highly recommended!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="testimonials-section" ref={testimonialsRef}>
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Real stories from our happy customers</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="card-3d-wrapper">
                <div className="card-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-content">{testimonial.content}</p>
                  
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                      />
                    ))}
                  </div>

                  <div className="author-info">
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                      <div className="image-glow"></div>
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-background-effect"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;