import React, { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";

interface VideoWithMessageProps {
  videoSrc: string;
}

const VideoWithMessage: React.FC<VideoWithMessageProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShakeOrTap, setIsShakeOrTap] = useState<boolean>(true);
  const [isContentShown, setIsContentShown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const generateRandomMessage = () => {
    const messages = [
      "You will soon find the inner peace you seek",
      "You love yourself today",
      "Have a nice day",
      "Thanks for coming",
      "Hope you find this good",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const handleScreenClick = () => {
    if (!isContentShown) {
      setIsContentShown(true);
      setIsShakeOrTap(false);
    }
  };

  useEffect(() => {
    const handleScreenClick = () => {
      if (!isContentShown) {
        setIsContentShown(true);
        setIsShakeOrTap(false);
      }
    };

    document.body.style.cursor = "pointer";

    document.addEventListener("click", handleScreenClick);
    return () => {
      document.body.style.cursor = "default"; // Reset cursor
      document.removeEventListener("click", handleScreenClick);
    };
  }, [isContentShown]);

  const handleVideoClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      generateRandomMessage();
      const video = document.getElementById(
        "video-element"
      ) as HTMLVideoElement;
      video.play();
    }
  };

  const handleOneMoreTimeClick = () => {
    setIsPlaying(true);
    generateRandomMessage();
    const video = document.getElementById("video-element") as HTMLVideoElement;
    video.currentTime = 0;
    video.play();
  };

  useEffect(() => {
    document.addEventListener("click", handleScreenClick);
    return () => {
      document.removeEventListener("click", handleScreenClick);
    };
  }, []);

  return (
    <div
      className="video-container"
      onClick={handleVideoClick}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        src={videoSrc}
        autoPlay={isPlaying}
        loop={false}
        muted
        id="video-element"
        className="video-element"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {isShakeOrTap && (
        <div
          className="overlay-content"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <p>Shake or tap</p>
        </div>
      )}

      {isContentShown && (
        <div
          className="overlay-content"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <p style={{ marginBottom: "20px" }}>{message}</p>{" "}
          <div
            onClick={handleOneMoreTimeClick}
            style={{
              backgroundColor: "green",
              border: "2px solid green",
              borderRadius: "5px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "100px",
              margin: "0 auto",
            }}
          >
            <FaRedo size={16} color="white" style={{ marginRight: "5px" }} />
            <p style={{ margin: "0", fontSize: "12px", color: "white" }}>
              One More
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoWithMessage;
