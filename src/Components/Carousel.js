import translations from "../Data/translations";

function Carousel() {
  const lang = "en";
  const day = "01";
  const sentence = translations[lang].carousel[day];

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        <img src={`images/${day}.png`} alt={`carousel item ${day}`} />
      </div>
      <div className="carousel-text-box">
        <p>{sentence}</p>
      </div>
    </div>
  );
} export default Carousel;
