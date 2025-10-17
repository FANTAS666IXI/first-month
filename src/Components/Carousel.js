import { useState } from "react";
import translations from "../Data/translations";

function Carousel() {
  const lang = "en";
  const [day, setDay] = useState(1);
  const sentence = translations[lang].carousel[day];

  const handlePrev = () => setDay((prev) => (prev > 1 ? prev - 1 : 31));
  const handleNext = () => setDay((prev) => (prev < 31 ? prev + 1 : 1));

  return (
    <div className="carousel-wrapper">
      <div className="header">
        <div className="day-indicator">Day {day}</div>
        <div className="controls">
          <i className="fa-solid fa-arrows-rotate replay" />
          <button className="play">
            <i className="fa-solid fa-play" />
          </button>
        </div>
      </div>
      <div className="carousel">
        <img src={`images/${day}.png`} alt={`carousel item ${day}`} />
      </div>
      <div className="text-box">
        <button className="arrow left" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left" />
        </button>
        <p>{sentence}</p>
        <button className="arrow right" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
