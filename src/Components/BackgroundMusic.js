import { useRef, useEffect, useState } from "react";

function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6); // default volume

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = volume;

        const tryPlay = () => {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                    console.log("Music autoplayed successfully");
                })
                .catch((err) => {
                    console.log("Autoplay prevented, waiting for interaction:", err);

                    const startOnInteraction = (e) => {
                        if (
                            e.type === "keydown" &&
                            (e.altKey ||
                                e.ctrlKey ||
                                e.metaKey ||
                                e.key === "Alt" ||
                                e.key === "Shift" ||
                                e.key === "Control" ||
                                e.key === "Meta" ||
                                e.key === "Tab")
                        )
                            return;

                        audio
                            .play()
                            .then(() => {
                                setIsPlaying(true);
                                document.removeEventListener("click", startOnInteraction);
                                document.removeEventListener("keydown", startOnInteraction);
                            })
                            .catch((playErr) =>
                                console.warn("Playback still blocked:", playErr)
                            );
                    };

                    document.addEventListener("click", startOnInteraction);
                    document.addEventListener("keydown", startOnInteraction);
                });
        };

        tryPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle manual play/pause
    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true));
        }
    };

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    // Determine which icon to show
    const getIconClass = () => {
        if (!isPlaying || volume === 0) return "fa-volume-xmark";
        if (volume < 0.5) return "fa-volume-low";
        return "fa-volume-high";
    };

    return (
        <div className="music-control">
            <audio ref={audioRef} src="/music/Шёлк.mp3" preload="auto" />
            <div className="music-ui">
                <button onClick={togglePlay} className="music-button">
                    <i className={`fa-solid ${getIconClass()}`} />
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
        </div>
    );
}

export default BackgroundMusic;
