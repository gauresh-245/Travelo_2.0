import React, { useEffect, useRef } from 'react';
import './HomeFeatures.css';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaMapMarkedAlt } from 'react-icons/fa';
import PlaneAnimation from './animations/PlaneAnimation';
import HotelAnimation from './animations/HotelAnimation';
import TransportAnimation from './animations/TransportAnimation';
import TripPlanningAnimation from './animations/TripPlanningAnimation';

const HomeFeatures = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FaPlane className="feature-icon" />,
      title: "Flight Booking",
      description: "Book flights to any destination worldwide with best prices",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      route: "/explore",
      animation: <PlaneAnimation />,
      animationClass: "plane-animation-wrapper"
    },
    {
      icon: <FaHotel className="feature-icon" />,
      title: "Hotel Reservations",
      description: "Find perfect stays from budget to luxury accommodations",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      route: "/hotel-search",
      animation: <HotelAnimation />,
      animationClass: "hotel-animation-wrapper"
    },
    {
      icon: <FaCar className="feature-icon" />,
      title: "Transport Services",
      description: "Car rentals, airport transfers, and local transportation",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      route: "/transports",
      animation: <TransportAnimation />,
      animationClass: "transport-animation-wrapper"
    },
    {
      icon: <FaMapMarkedAlt className="feature-icon" />,
      title: "Trip Planning",
      description: "Create custom itineraries with our smart trip planner",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      route: "/create-trip",
      animation: <TripPlanningAnimation />,
      animationClass: "trip-animation-wrapper"
    }
  ];

  return (
    <section className="home-features">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-text">Why Choose</span>
            <span className="title-highlight"> Travelo?</span>
          </h2>
          <p className="section-subtitle">
            Experience seamless travel planning with our all-in-one platform
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="feature-card"
              onClick={() => navigate(feature.route)}
              style={{ '--card-gradient': feature.gradient }}
            >
              <div className="card-3d-container">
                <div className={`card-content ${feature.animationClass}`}>
                  <div className="animation-container">
                    {feature.animation}
                  </div>
                  <div className="card-icon-wrapper">
                  
                   
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                 
               
                </div>
                <div className="card-background"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <button 
            className="cta-button"
            onClick={() => navigate('/create-trip')}
          >
            Start Planning Your Journey
            <div className="button-sparkle"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;