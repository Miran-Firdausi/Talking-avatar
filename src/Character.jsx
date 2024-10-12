import React, { useState, useEffect, useRef } from "react";
import visemeMap from "./VisemeMap";
import visemeData from "./visemeData";
import CharacterBody from "./assets/Woman-1.svg";
import Woman1 from "./Woman1";
import "./Character.css";
import "./Woman.css";
import outputAudio from "./assets/output.wav";

const Character = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // To track if animation has started
  const audioRef = useRef(null); // Ref for the audio object
  const timeouts = useRef([]); // To store timeout references

  // Function to start playing the audio and viseme animation
  const startAnimation = () => {
    const audio = new Audio(outputAudio);
    audioRef.current = audio; // Store the audio object in ref

    audio
      .play()
      .then(() => {
        setIsPlaying(true); // Set playing state to true

        // Start the viseme animation based on the audio timestamps
        visemeData.forEach((e) => {
          const timeout = setTimeout(() => {
            setImageIndex(e.id); // Update image based on viseme ID
          }, e.offset);

          // Store timeouts so they can be cleared later if needed
          timeouts.current.push(timeout);
        });
      })
      .catch((error) => {
        console.error("Failed to play audio:", error);
      });
  };

  useEffect(() => {
    // Cleanup timeouts and audio on unmount
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      {!isPlaying && (
        <button className="play-btn" onClick={startAnimation}>
          Start Animation
        </button>
      )}
      <div className="character-container">
        <>
          {/* <img
            src={CharacterBody}

            alt="Character Body"
          /> */}
          <Woman1 />

          <div className="mouth-container">
            <img
              className="mouth-image"
              src={visemeMap[imageIndex]} // Display the current viseme image
              width={21}
              alt="Mouth"
            />
          </div>
        </>
      </div>
    </>
  );
};

export default Character;
