import React from 'react';
import './Animations.css';

const HotelAnimation = () => {
  return (
    <div className="hotel-animation">
      {/* Hotel Building */}
      <div className="hotel-building">
        <div className="hotel-roof"></div>
        <div className="hotel-body">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="hotel-window" style={{ 
              animationDelay: `${i * 0.2}s` 
            }}>
              <div className="window-light"></div>
            </div>
          ))}
        </div>
        <div className="hotel-entrance">
          <div className="hotel-door"></div>
          <div className="hotel-doormat"></div>
        </div>
      </div>
      
      {/* Stars in the sky */}
      <div className="stars">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* People animation */}
      <div className="people">
        <div className="person person-1">
          <div className="person-head"></div>
          <div className="person-body"></div>
          <div className="person-bag"></div>
        </div>
        <div className="person person-2">
          <div className="person-head"></div>
          <div className="person-body"></div>
          <div className="person-suitcase"></div>
        </div>
      </div>
    </div>
  );
};

export default HotelAnimation;