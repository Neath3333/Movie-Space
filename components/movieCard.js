import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function MovieCard({ movie }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="cursor-pointer w-40">
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={movie.title}
            width={160}
            height={240}
            className="w-full h-auto"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium">{movie.title}</h3>
          <p className="text-xs text-gray-600">Rating: {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}

// Add prop types to remove ESLint warning
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string, // optional, can be null
    vote_average: PropTypes.number
  }).isRequired
};
