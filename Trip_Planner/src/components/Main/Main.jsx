import React from "react";
import "./Main.css";
import arrow_btn from "../../assets/arrow_btn.png";
import play_icon from "../../assets/play_icon.png";
import pause_icon from "../../assets/pause_icon.png";
import { useNavigate } from "react-router-dom";

const Main = ({
  MainData,
  playStatus,
  setPlayStatus,
  dataCount,
  setDataCount,
}) => {
  const navigate = useNavigate();

  const handleButtonClicked = () => {
    navigate("/TravelSpots");
  };

  return (
    <div className="main">
      <div className="main-content">
        <div className="main-text">
          <p className="text-line">{MainData.text1}</p>
          <p className="text-line">{MainData.text2}</p>
        </div>

        <div className="main_Explore" onClick={handleButtonClicked}>
          <div className="explore-content">
            <p>Explore the features</p>
            <div className="arrow-wrapper">
              <img src={arrow_btn} alt="Explore" className="arrow-bounce" />
            </div>
          </div>
          <div className="explore-background"></div>
        </div>

        <div className="Main-dot-play">
          <ul className="Main-dots">
            {[0, 1, 2].map((index) => (
              <li
                key={index}
                onClick={() => setDataCount(index)}
                className={dataCount === index ? "Main-dot orange" : "Main-dot"}
              >
                <div className="dot-inner"></div>
              </li>
            ))}
          </ul>

          <div className="Video-play">
            <div
              className="play-button"
              onClick={() => setPlayStatus(!playStatus)}
            >
              <img
                src={playStatus ? pause_icon : play_icon}
                alt={playStatus ? "Pause" : "Play"}
              />
              <div className="pulse-effect"></div>
            </div>
            <p>See the video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
