"use client";

import FilmCardWithLikes from "@/components/FilmCardWithLikes";
import { useSession } from "next-auth/react";

export default function RecommendationFeed({ movies, userId }) {
  const { data: session } = useSession();

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No recommendations yet.</p>
        <p className="text-gray-500 mt-2">
          Like some movies or leave reviews to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          className="relative"
        >
          <FilmCardWithLikes movie={movie} />
          {movie.recommendationScore && (
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-lime-300 text-xs px-2 py-1 rounded-full font-semibold">
              {movie.recommendationScore.toFixed(1)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
}