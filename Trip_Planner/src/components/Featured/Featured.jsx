import React from "react";
import "./Featured.css";

const Featured = () => {
  const destinations = [
    { name: "Bali, Indonesia", price: "$650", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4" },
    { name: "Swiss Alps", price: "$900", img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e" },
    { name: "Kyoto, Japan", price: "$750", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" }
  ];

  return (
    <div className="featured-section">
      <h2 className="f-title">Top Destinations</h2>
      <div className="f-grid">
        {destinations.map((item, index) => (
          <div className="f-card" key={index}>
            <div className="f-card-inner" style={{backgroundImage: `url(${item.img})`}}>
              <div className="f-overlay">
                <h3>{item.name}</h3>
                <p>Starting at {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Featured;