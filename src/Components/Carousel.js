import { useState, useEffect, useRef } from "react";
import translations from "../Data/translations";

function Carousel() {
  const lang = "en";
  const [day, setDay] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imgRef = useRef(null);
  const carouselRef = useRef(null);

  const totalDays = 31;
  const sentence = translations[lang].carousel[day];

  // --- Adjust carousel size when image loads ---
  const handleImageLoad = () => {
    if (imgRef.current && carouselRef.current) {
      const { width, height } = imgRef.current.getBoundingClientRect();
      carouselRef.current.style.width = `${width}px`;
      carouselRef.current.style.height = `${height}px`;
    }
  };

  // --- Transition control ---
  const changeDay = (newDay) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Step 1: fade out + measure current size
    setTimeout(() => {
      // Step 2: change image after fade out
      setDay(newDay);
    }, 500);

    // Step 3: end transition after full duration
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const handlePrev = () => changeDay(day > 1 ? day - 1 : totalDays);
  const handleNext = () => changeDay(day < totalDays ? day + 1 : 1);

  // --- Keyboard control ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          handlePrev();
          break;
        case "ArrowRight":
        case "KeyD":
          handleNext();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, isTransitioning]);

  // --- Adjust carousel size on mount & every new image ---
  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete) handleImageLoad();
  }, [day]);

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

      <div className="carousel" ref={carouselRef}>
        <img
          ref={imgRef}
          src={`images/${day}.png`}
          alt={`carousel item ${day}`}
          className={isTransitioning ? "fade-out" : "visible"}
          onLoad={handleImageLoad}
        />
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
