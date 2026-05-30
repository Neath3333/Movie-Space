"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection({ featuredMovies = [] }) {
  // Deduplicate movies by ID to prevent React key warnings
  const uniqueMovies = React.useMemo(() => {
    const seen = new Set();
    return featuredMovies.filter(movie => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [featuredMovies]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % uniqueMovies.length);
  }, [uniqueMovies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? uniqueMovies.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (movieId) => {
    setLoadedImages(prev => ({ ...prev, [movieId]: true }));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (uniqueMovies.length <= 1 || isPaused) return;

    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [uniqueMovies.length, isPaused, goToNext]);

  // Fallback if no movies
  if (!featuredMovies || featuredMovies.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-lime-400 to-green-500 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Movie Space</h1>
            <p className="text-xl md:text-2xl mb-8">Discover amazing movies and TV shows</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {uniqueMovies.map((movie, idx) => {
          const backdropUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : null;
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null;
          const isLoaded = loadedImages[movie.id];

          return (
            <div key={movie.id} className="min-w-full h-full relative">
              {/* Backdrop Image */}
              {backdropUrl ? (
                <>
                  <Image
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    quality={85}
                    onLoad={() => handleImageLoad(movie.id)}
                  />
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              )}

              {/* Content */}
              <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-end pb-16 sm:pb-20 md:pb-24 z-10">
                <div className="max-w-full sm:max-w-xl md:max-w-2xl w-full">
                  <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-lime-400 text-black text-xs sm:text-sm font-bold rounded-full mb-2 sm:mb-4">
                    Featured
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                    {movie.title || movie.name}
                  </h1>

                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-lime-400 text-sm sm:text-base">★</span>
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {movie.vote_average?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                    {movie.release_date && (
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {movie.release_date.slice(0, 4)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 line-clamp-2 sm:line-clamp-3">
                    {movie.overview || "No description available for this movie."}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <Link
                      href={`/movies/${movie.id}`}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <Info size={16} className="sm:w-5 sm:h-5" />
                      More Info
                    </Link>
                    <Link
                      href="/discover"
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg backdrop-blur-sm transition-colors text-sm sm:text-base"
                    >
                      <Play size={16} className="sm:w-5 sm:h-5" />
                      Discover
                    </Link>
                  </div>
                </div>

                {/* Poster Image */}
                {posterUrl && (
                  <div className="hidden lg:block absolute right-20 bottom-20">
                    <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="256px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Always visible on mobile, on hover for desktop */}
      {uniqueMovies.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-300 z-20"
            aria-label="Previous movie"
          >
            <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-300 z-20"
            aria-label="Next movie"
          >
            <ChevronRight size={24} className="sm:w-7 sm:h-7" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {uniqueMovies.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {uniqueMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-lime-400"
                  : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-20" />
    </div>
  );
}
