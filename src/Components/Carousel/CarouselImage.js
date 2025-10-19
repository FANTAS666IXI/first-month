export default function CarouselImage({ day, isTransitioning, imgRef, carouselRef, handleImageLoad }) {
    return (
        <div className="carousel-image" ref={carouselRef}>
            <img
                ref={imgRef}
                src={`images/${day}.png`}
                alt={`carousel item ${day}`}
                className={isTransitioning ? "fade-out" : "visible"}
                onLoad={handleImageLoad}
            />
        </div>
    );
}
