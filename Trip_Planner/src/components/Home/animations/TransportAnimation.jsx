import React from 'react';
import './Animations.css';

const TransportAnimation = () => {
  return (
    <div className="transport-animation">
      {/* Road */}
      <div className="road">
        <div className="road-lines">
          <div className="road-line"></div>
          <div className="road-line"></div>
          <div className="road-line"></div>
        </div>
      </div>
      
      {/* Moving Bus */}
      <div className="bus">
        <div className="bus-body">
          <div className="bus-front">
            <div className="bus-windshield"></div>
            <div className="bus-headlights"></div>
          </div>
          <div className="bus-windows">
            <div className="bus-window"></div>
            <div className="bus-window"></div>
            <div className="bus-window"></div>
          </div>
          <div className="bus-wheels">
            <div className="bus-wheel"></div>
            <div className="bus-wheel"></div>
            <div className="bus-wheel"></div>
            <div className="bus-wheel"></div>
          </div>
        </div>
        <div className="bus-smoke">
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
        </div>
      </div>
      
      {/* Train Tracks */}
      <div className="train-tracks">
        <div className="track"></div>
        <div className="track"></div>
      </div>
      
      {/* Moving Train */}
      <div className="train">
        <div className="train-engine">
          <div className="train-cabin"></div>
          <div className="train-smokestack">
            <div className="train-smoke"></div>
          </div>
        </div>
        <div className="train-carriage">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
        </div>
        <div className="train-wheels">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="train-wheel"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportAnimation;