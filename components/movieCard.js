"use client";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder.jpg";

  return (
    <div className="w-48 relative group overflow-hidden rounded-lg mb-10">
      <Image
        src={imageUrl}
        width={200}
        height={300}
        alt={movie.title}
        className=" object-cover transition-transform duration-700 ease-out group-hover:scale-115 group-hover:rotate-1"
      />
      <div className="bg-lime-400/50 backdrop-blur-md border-t border-white/20 absolute bottom-0 left-0 w-full p-2 
                translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <div
        className=" text-white ml-2 "
      >
        {/* Title */}
        <h3 className="text-[7px] line-clamp-1 font-semibold">{movie.title}</h3>
        {/* Rating + year*/}
        <p className="text-xs">
          ⭐{movie.vote_average?.toFixed(1)} | {movie.release_date?.slice(0, 4)}
        </p>
        {/* Short Overview */}
        <p className="text-[16px] line-clamp-2">{movie.overview} </p>
        {/* Like Button */}
      </div>
     </div>
    </div>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
  }),
};
