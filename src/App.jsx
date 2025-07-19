import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import "./index.css";

const prewrittenLetters = [
  `Dear {{name}},\nFrom the moment we met, my world transformed into a symphony of love and joy...`,
  `To my dearest {{name}},\nEvery heartbeat of mine whispers your name...`,
  `Sweet {{name}},\nYou are my peace in chaos, my sun after the storm...`,
  // Add up to 10 letters total here...
];
export default function App() {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [customName, setCustomName] = useState("Love");
  const [customLetter, setCustomLetter] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const musicRef = useRef(null);

  const handleLetterSelect = (index) => {
    setUseCustom(false);
    setSelectedLetter(prewrittenLetters[index]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setVideos(files.map((file) => URL.createObjectURL(file)));
  };

  const playMusic = () => {
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  const pauseMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
    }
  };

  const renderLetter = () => {
    const text = useCustom ? customLetter : selectedLetter;
    return text.replace(/{{name}}/g, customName);
  };
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-rose-100 to-pink-200 text-gray-800 font-[Montserrat] relative">
      {showConfetti && <Confetti />}

      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-bold font-[Great_Vibes] text-pink-600">
          Happy Girlfriend’s Day 💌
        </h1>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter her name"
            className="border px-4 py-2 rounded w-full"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />

          <textarea
            className="w-full h-40 p-3 border rounded"
            placeholder="Write your own letter..."
            value={customLetter}
            onChange={(e) => {
              setUseCustom(true);
              setCustomLetter(e.target.value);
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {prewrittenLetters.map((_, i) => (
              <button
                key={i}
                onClick={() => handleLetterSelect(i)}
                className="bg-pink-500 text-white rounded px-2 py-1 text-sm hover:bg-pink-600"
              >
                Letter {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          <input type="file" multiple accept="video/*" onChange={handleVideoUpload} />
        </div>

        <div className="space-x-2">
          <button onClick={playMusic} className="bg-green-500 text-white px-3 py-1 rounded">
            ▶ Play Music
          </button>
          <button onClick={pauseMusic} className="bg-yellow-500 text-white px-3 py-1 rounded">
            ⏸ Pause Music
          </button>
          <button
            onClick={() => setShowConfetti(!showConfetti)}
            className="bg-purple-500 text-white px-3 py-1 rounded"
          >
            🎉 Toggle Confetti
          </button>
        </div>

        <div className="border p-4 rounded bg-white shadow">
          <h2 className="font-semibold mb-2">💖 Your Letter</h2>
          <p className="whitespace-pre-wrap">{renderLetter()}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`uploaded-${i}`} className="rounded shadow-md" />
          ))}
          {videos.map((vid, i) => (
            <video key={i} src={vid} controls className="rounded shadow-md" />
          ))}
        </div>

        <audio ref={musicRef} loop>
          <source src="/romantic-bg.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
}

