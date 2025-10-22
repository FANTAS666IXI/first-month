import { useState, useEffect, useRef, useContext } from "react";
import { TranslationsContext } from "../../Contexts/TranslationsContext"
import CarouselHeader from "./CarouselHeader";
import CarouselImage from "./CarouselImage";
import CarouselTextBox from "./CarouselTextBox";

function Carousel() {
  const TOTAL_DAYS = 31;
  const FADE_OUT_DURATION = 500;
  const TRANSITION_END_DELAY = 1000;
  const AUTOPLAY_DELAY = 10000;
  const [day, setDay] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const imgRef = useRef(null);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  /**
   * Translations context.
   * @type {{object}}.
   */
  const { translations } = useContext(TranslationsContext)
  const texts = translations.carousel;

  // const sentence = translations.carousel[day.toString().padStart(2, "0")];
  const sentence = texts[day];

  // --- Adjust carousel size when image loads ---
  const handleImageLoad = () => {
    const img = imgRef.current;
    const container = carouselRef.current;
    if (!img || !container) return;

    // Esperamos un microtimeout para asegurarnos de que el fade-in está activo
    setTimeout(() => {
      container.style.width = `${img.naturalWidth}px`;
      container.style.height = `${img.naturalHeight}px`;
    }, 50); // 50ms es suficiente
  };

  // --- Transition control ---
  const changeDay = (newDay) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => setDay(newDay), FADE_OUT_DURATION);
    setTimeout(() => setIsTransitioning(false), TRANSITION_END_DELAY);
  };

  // --- Manual navigation stops autoplay ---
  const handlePrev = (fromAutoplay = false) => {
    if (isAutoplay && !fromAutoplay) stopAutoplay();
    changeDay(day > 1 ? day - 1 : day);
  };

  const handleNext = (fromAutoplay = false) => {
    if (isAutoplay && !fromAutoplay) stopAutoplay();

    if (day < TOTAL_DAYS - 1) {
      changeDay(day + 1);
    } else {
      // Llegamos al último día
      changeDay(TOTAL_DAYS);
      stopAutoplay(); // detener autoplay automáticamente
    }
  };

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
        case "Space":
          e.preventDefault();
          toggleAutoplay();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, isTransitioning, isAutoplay]);

  // --- Adjust carousel size on mount & every new image ---
  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete) handleImageLoad();
  }, [day]);

  // --- Autoplay effect ---
  useEffect(() => {
    clearTimeout(autoplayRef.current);

    if (isAutoplay) {
      autoplayRef.current = setTimeout(() => {
        if (!isTransitioning) handleNext(true);
      }, AUTOPLAY_DELAY);
    }

    return () => clearTimeout(autoplayRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoplay, day, isTransitioning]);

  // --- Autoplay control helpers ---
  const toggleAutoplay = () => setIsAutoplay((prev) => !prev);
  const stopAutoplay = () => {
    clearTimeout(autoplayRef.current);
    setIsAutoplay(false);
  };

  return (
    <div className="carousel">
      <CarouselHeader day={day} isAutoplay={isAutoplay} toggleAutoplay={toggleAutoplay} />
      <CarouselImage day={day} isTransitioning={isTransitioning} imgRef={imgRef} carouselRef={carouselRef} handleImageLoad={handleImageLoad} TOTAL_DAYS={TOTAL_DAYS} />
      <CarouselTextBox sentence={sentence} handlePrev={() => handlePrev()} handleNext={() => handleNext()} />
    </div>
  );
}

export default Carousel;
