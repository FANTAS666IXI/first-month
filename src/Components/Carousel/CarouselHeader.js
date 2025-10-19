export default function CarouselHeader({ day, isAutoplay, toggleAutoplay }) {
    return (
        <div className="carousel-header">
            <div className="day-indicator">Day {day}</div>
            <div className="controls">
                <i className={`fa-solid fa-arrows-rotate replay ${isAutoplay ? "active spinning" : ""}`} />
                <button className="play" onClick={toggleAutoplay}>
                    <i className={`fa-solid ${isAutoplay ? "fa-pause" : "fa-play"}`} />
                </button>
            </div>
        </div>
    );
}
