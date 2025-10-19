export default function CarouselTextBox({ sentence, handlePrev, handleNext }) {
    return (
        <div className="carousel-text-box">
            <button className="arrow left" onClick={handlePrev}>
                <i className="fa-solid fa-chevron-left" />
            </button>
            <p>{sentence}</p>
            <button className="arrow right" onClick={handleNext}>
                <i className="fa-solid fa-chevron-right" />
            </button>
        </div>
    );
}
