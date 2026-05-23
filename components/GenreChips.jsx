"use client";

import Link from "next/link";

export default function GenreChips({ genres, selectedGenre }) {
  const buildUrl = (genreId) => {
    if (genreId === 0) {
      return "/recommendation";
    }
    return `/recommendation?genre=${genreId}`;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-800">
      {genres.map((genre) => {
        const isSelected = genre.id === selectedGenre;

        return (
          <Link
            key={genre.id}
            href={buildUrl(genre.id)}
            scroll={false}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${isSelected
                ? "bg-lime-400 text-black shadow-lg shadow-lime-400/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            `}
          >
            {genre.name}
          </Link>
        );
      })}
    </div>
  );
}