'use client';

import { useState, useRef, useEffect } from 'react';
import React from 'react';
export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all"
          >
            {isPlaying ? <div className='flex gap-2'><img src="/pause-button-svgrepo-com.svg" alt="Pause" width="20" height="20" />Pause</div> : <div className='flex gap-2'><img src="/music-svgrepo-com.svg" alt="Play" width="20" height="20" />Focus Music</div>}
          </button>

          <audio
            ref={audioRef}
            src="/Relaxing_Music_-_Peaceful_Piano_and_Soft_Rain_-_Sleep_Music_KLICKAUD.mp3"
            loop
          />
        </div>
      </div>
    </div>
  );
}
