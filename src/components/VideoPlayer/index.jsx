import React from "react";
import Character from "../../Character";
import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <div className="video-player-container">
      <video controls>
        <source
          src="/97c0f2bd-2753-419e-ad3c-0908e42b7943.mp4"
          type="video/mp4"
        />
      </video>
      <Character />
    </div>
  );
}

export default VideoPlayer;
