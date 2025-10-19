import { useEffect } from "react";

export default function CarouselImage({ day, isTransitioning, imgRef, carouselRef, handleImageLoad, TOTAL_DAYS }) {

    // Preload next and previous images
    useEffect(() => {
        const preloadImage = (d) => {
            const img = new Image();
            img.src = `images/${d}.png`;
        };

        const nextDay = day < TOTAL_DAYS ? day + 1 : 1;
        const prevDay = day > 1 ? day - 1 : TOTAL_DAYS;

        preloadImage(nextDay);
        preloadImage(prevDay);
    }, [day, TOTAL_DAYS]);

    return (
        <div className="carousel-image" ref={carouselRef}>
            <img
                ref={imgRef}
                src={`images/${day}.png`}
                alt={`carousel item ${day}`}
                className={isTransitioning ? "fade-out" : "visible"}
                loading="lazy" // native lazy loading
                onLoad={handleImageLoad}
            />
        </div>
    );
}
