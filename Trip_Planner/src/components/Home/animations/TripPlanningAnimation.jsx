import React from 'react';
import './Animations.css';

const TripPlanningAnimation = () => {
  return (
    <div className="trip-animation">
      {/* Map Background */}
      <div className="map-background">
        <div className="map-grid">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>
        
        {/* Map Pins */}
        <div className="map-pins">
          <div className="map-pin pin-1">
            <div className="pin-head"></div>
            <div className="pin-body"></div>
            <div className="pin-label">Paris</div>
          </div>
          <div className="map-pin pin-2">
            <div className="pin-head"></div>
            <div className="pin-body"></div>
            <div className="pin-label">Tokyo</div>
          </div>
          <div className="map-pin pin-3">
            <div className="pin-head"></div>
            <div className="pin-body"></div>
            <div className="pin-label">New York</div>
          </div>
        </div>
        
        {/* Connecting Routes */}
        <div className="map-routes">
          <div className="route route-1"></div>
          <div className="route route-2"></div>
          <div className="route route-3"></div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-month">December 2024</div>
        </div>
        <div className="calendar-days">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="calendar-day-label">{day}</div>
          ))}
          {[...Array(31)].map((_, i) => (
            <div 
              key={i} 
              className={`calendar-day ${i === 15 ? 'active' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      {/* Checklist */}
      <div className="checklist">
        <div className="checklist-item">
          <div className="checkmark checked"></div>
          <span className="checklist-text">Book Flights ✓</span>
        </div>
        <div className="checklist-item">
          <div className="checkmark checked"></div>
          <span className="checklist-text">Reserve Hotel ✓</span>
        </div>
        <div className="checklist-item">
          <div className="checkmark"></div>
          <span className="checklist-text">Plan Activities</span>
        </div>
      </div>
    </div>
  );
};

export default TripPlanningAnimation;