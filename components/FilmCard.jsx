"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { Heart } from "lucide-react";

export default function FilmCard({ movie, isLiked = false, onLikeToggle }) {
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  if (!movie) return null;

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      const res = await fetch("/api/likes", {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: movie.id,
          movieTitle: movie.title,
          moviePoster: movie.poster_path,
        }),
      });

      if (res.ok) {
        setLiked(!liked);
        onLikeToggle?.(movie.id, !liked);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";
  return (
    <div className=" flex-grow">
      <Link href={`/movies/${movie.id}`}>
        <div className="w-48 relative group overflow-hidden rounded-lg mx-auto">
          <Image
            src={imageUrl}
            width={200}
            height={280}
            alt={movie.title}
            className=" object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
          />
          {/* Heart Icon Button */}
          <button
            onClick={handleLike}
            disabled={loading}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              liked
                ? "bg-red-500/80 text-white"
                : "bg-black/30 text-white hover:bg-black/50"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart
              size={18}
              fill={liked ? "currentColor" : "none"}
              className={liked ? "text-red-100" : "text-white"}
            />
          </button>
          <div
            className="bg-lime-400/50 backdrop-blur-md border-t border-white/20 absolute bottom-0 left-0 w-full p-2 
                translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
          >
            <div className=" text-white ml-2 ">
              {/* Title */}
              <h3 className="text-[7px] line-clamp-1 font-semibold">
                {movie.title}
              </h3>
              {/* Rating + year*/}
              <p className="text-xs">
                ⭐{movie.vote_average?.toFixed(1)} |{" "}
                {movie.release_date?.slice(0, 4)}
              </p>
              {/* Short Overview */}
              <p className="text-[16px] line-clamp-2">{movie.overview} </p>
              {/* Like Button */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
FilmCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
  }),
  isLiked: PropTypes.bool,
  onLikeToggle: PropTypes.func,
};
