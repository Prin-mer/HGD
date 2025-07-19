
import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [letter, setLetter] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [media, setMedia] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const audioRef = useRef(null);

  // Auto slide logic
  useEffect(() => {
    let interval;
    if (showGallery && media.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % media.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showGallery, media]);

  // Handle audio play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && audio) {
        audioRef.current.play().catch((e) => console.error('Playback failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audio]);

  const generateLetter = () => {
    if (name.trim()) {
      const newLetter = `Dear ${name},\n\nOn this special Girlfriend's Day, I just want to remind you how much you mean to me. You bring so much joy, laughter, and love into my life. Your smile lights up my world, and your heart is the most beautiful thing I've ever known. I'm so grateful to have you by my side through every high and low. I love you more than words can express.\n\nWith all my love,\nYour devoted partner`;
      setLetter(newLetter);
      setShowLetter(true);
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }));
    setMedia(prev => [...prev, ...newMedia]);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudio(url);
      setIsPlaying(true);
    }
  };

  const renderNavigation = () => (
    <nav className="bg-pink-50 shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-around">
        <button
          onClick={() => {
            setShowLetter(false);
            setShowGallery(false);
            setIsPlaying(false);
          }}
          className="text-pink-600 font-bold hover:text-pink-800 transition"
        >
          Home
        </button>
        <button
          onClick={() => {
            if (name) setShowLetter(true);
          }}
          className={`font-bold ${name ? 'text-pink-600 hover:text-pink-800' : 'text-pink-300 cursor-not-allowed'} transition`}
          disabled={!name}
        >
          Letter
        </button>
        <button
          onClick={() => setShowGallery(true)}
          className={`font-bold ${showLetter ? 'text-pink-600 hover:text-pink-800' : 'text-pink-300 cursor-not-allowed'} transition`}
          disabled={!showLetter}
        >
          Gallery
        </button>
      </div>
    </nav>
  );

  const renderHome = () => (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 mb-4 text-center animate-pulse">
        <span className="inline-block">🌹</span>Happy Girlfriend's Day<span className="inline-block">🌹</span>
      </h1>
      <p className="text-2xl md:text-3xl text-pink-500 mb-8 text-center italic">My sweet, my love, my everything</p>
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-6">
        <label className="block text-pink-700 font-semibold mb-2" htmlFor="name">
          Enter your girlfriend's name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Her beautiful name"
          className="w-full p-3 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <button
        onClick={generateLetter}
        className="bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Generate Love Letter 💖
      </button>
    </section>
  );

  const renderLetter = () => {
    if (!showLetter) return null;
    
    return (
      <section className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Your Love Letter</h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 animate-pulse"></div>
            <div className="animate-float">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-100 rounded-full opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-100 rounded-full opacity-30"></div>
            </div>
            
            <div className="whitespace-pre-line text-lg text-gray-800 leading-relaxed relative z-10 p-4">
              {letter}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowGallery(true)}
              className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Next: Gallery 📷
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!showGallery) return null;

    return (
      <section className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 p-4 md:p-8 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Your Memories Gallery</h2>

          <div className="mb-6">
            <label className="block text-pink-700 font-semibold mb-2 text-center">
              Upload pictures and videos of your girlfriend:
            </label>
            <div className="flex justify-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="block w-full max-w-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-400 file:text-white hover:file:bg-pink-500"
              />
            </div>
          </div>

          {/* Gallery Slideshow */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg mb-8">
            {media.length > 0 ? (
              media.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt="Gallery"
                      onClick={() => setFullscreenImage(item.url)}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                    )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-pink-600 font-semibold">
                No media uploaded yet.
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => alert('Your love letter and memories have been shared! ❤️')}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              <span>Share This Love</span>
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-11.6 4.3a9 9 0 0113.2 0 1 1 0 001.6-1.2A11 11 0 002.8 11.5a1 1 0 101.6 1.2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating music upload button */}
        <div className="fixed bottom-4 right-4 z-50">
          <label className="block">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
              id="music-upload"
            />
            <label
              htmlFor="music-upload"
              className="bg-pink-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-pink-600 transition"
            >
              🎵
            </label>
          </label>
        </div>

        {/* Fullscreen image modal */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={() => setFullscreenImage(null)}
          >
            <img
              src={fullscreenImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderNavigation()}
      {!showLetter && !showGallery && renderHome()}
      {renderLetter()}
      {renderGallery()}

      {/* Hidden audio player */}
      {audio && (
        <audio ref={audioRef} src={audio} loop autoPlay />
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
