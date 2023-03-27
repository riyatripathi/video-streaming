import { useState } from "react";
import VideoPlayer from "./Components/VideoPlayer";
import "./App.css";

function App() {
  const [videoId, setVideoId] = useState(null);

  function playVid(e, videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }
  return (
    <div className="App">
      {videoId && <VideoPlayer vidId={videoId}></VideoPlayer>}
      <div className="row">
        <button
          onClick={(e) => {
            playVid(e, "vid1");
          }}
        >
          Play Vid1
        </button>
        <button
          onClick={(e) => {
            playVid(e, "vid2");
          }}
        >
          Play Vid2
        </button>
        <button
          onClick={(e) => {
            playVid(e, "vid3");
          }}
        >
          Play Vid3
        </button>
      </div>
    </div>
  );
}

export default App;
