import { useContext } from "react";
import { TranslationsContext } from "../../Contexts/TranslationsContext"

export default function CarouselHeader({ day, isAutoplay, toggleAutoplay }) {
    /**
     * Translations context.
     * @type {{object}}.
     */
    const { translations } = useContext(TranslationsContext)
    const texts = translations.dayCounter;

    return (
        <div className="carousel-header">
            <div className="day-indicator">{texts} {day}</div>
            <div className="controls">
                <i className={`fa-solid fa-arrows-rotate replay ${isAutoplay ? "active spinning" : ""}`} />
                <button className="play" onClick={toggleAutoplay}>
                    <i className={`fa-solid ${isAutoplay ? "fa-pause" : "fa-play"}`} />
                </button>
            </div>
        </div>
    );
}
