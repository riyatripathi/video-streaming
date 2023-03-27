import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ vidId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });
  return (
    <video
      ref={videoRef}
      width="320"
      height="300"
      controls
      autoPlay
      style={{ border: "1px solid black", margin: "10px" }}
    >
      <source
        src={`http://localhost:5000/videos/${vidId}`}
        type="video/mp4"
      ></source>
      Your browser does not support the video tag
    </video>
  );
};

export default VideoPlayer;
