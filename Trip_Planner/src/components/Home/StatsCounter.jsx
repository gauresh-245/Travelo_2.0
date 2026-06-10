import React, { useEffect, useState } from 'react';
import './StatsCounter.css';
import { FaUsers, FaGlobeAmericas, FaStar, FaHeart } from 'react-icons/fa';

const StatsCounter = () => {
  const [counters, setCounters] = useState([
    { value: 0, target: 10000, prefix: '+', label: 'Happy Travelers', icon: <FaUsers /> },
    { value: 0, target: 150, suffix: '+', label: 'Destinations', icon: <FaGlobeAmericas /> },
    { value: 0, target: 4.8, suffix: '/5', label: 'Customer Rating', icon: <FaStar /> },
    { value: 0, target: 98, suffix: '%', label: 'Satisfaction Rate', icon: <FaHeart /> }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector('.stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    counters.forEach((counter, index) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = counter.target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= counter.target) {
          current = counter.target;
          clearInterval(timer);
        }

        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = { ...newCounters[index], value: Math.floor(current) };
          return newCounters;
        });
      }, duration / steps);
    });
  };

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {counters.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="icon-ring"></div>
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  <span className="counter">{stat.prefix || ''}{stat.value}{stat.suffix || ''}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="stat-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;