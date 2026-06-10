import React from "react";
import "./Background.css";
import video1 from "../../assets/Newvideo.mp4";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/7.jpg";
import img3 from "../../assets/3.jpg";

const Background = ({ playStatus, dataCount }) => {
  if (playStatus) {
    return (
      <div className="video-container">
        <video className="background fade-in" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
    );
  } else if (dataCount === 0) {
    return (
      <div className="image-container">
        <img src={image1} className="background fade-in" alt="Background 1" />
        <div className="image-overlay"></div>
      </div>
    );
  } else if (dataCount === 1) {
    return (
      <div className="image-container">
        <img src={image2} className="background fade-in" alt="Background 2" />
        <div className="image-overlay"></div>
      </div>
    );
  } else if (dataCount === 2) {
    return (
      <div className="image-container">
        <img src={img3} className="background fade-in" alt="Background 3" />
        <div className="image-overlay"></div>
      </div>
    );
  }
};

export default Background;
