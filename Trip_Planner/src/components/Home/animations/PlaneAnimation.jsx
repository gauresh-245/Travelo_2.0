import React from 'react';
import './Animations.css';

const PlaneAnimation = () => {
  return (
    <div className="plane-animation">
      {/* Clouds in background */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      
      {/* Sky background with gradient */}
      <div className="sky">
        <div className="sun"></div>
      </div>
      
      {/* Animated plane */}
      <div className="plane">
        <div className="plane-body">
          <div className="plane-cockpit"></div>
          <div className="plane-tail"></div>
          <div className="plane-wing plane-wing-left"></div>
          <div className="plane-wing plane-wing-right"></div>
          <div className="plane-engine"></div>
        </div>
        <div className="plane-trail">
          <div className="trail-dot"></div>
          <div className="trail-dot"></div>
          <div className="trail-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaneAnimation;