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
      <div className="carousel">
        <img src={`images/${day}.png`} alt={`carousel item ${day}`} />
      </div>

      <div className="carousel-text-box">
        <button className="arrow left" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>{sentence}</p>
        <button className="arrow right" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
