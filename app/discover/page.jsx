import { getPopularMovies, getUpcomingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import React from "react";
export default async function DiscoverPage() {
  const popular = await getPopularMovies();
  const upComing = await getUpcomingMovies();

  const popularMovies = popular.results;
  const upComingMovies = upComing.results;

  return (
    <div>
      <div className="px-5 py-8 grow">
        <h1 className="text-5xl font-black my-5 text-lime-300 underline">
          Popular Movies
        </h1>
        <div className="grid grid-cols-5 gap-4 p-4 container mx-auto px-2 py-8 grow">
          {popularMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="text-black text-[18px] hover:scale-105 transition-transform duration-200 p-4xl"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-8 grow">
        <h1 className="text-5xl font-black my-5 text-lime-300 underline">
          New Release Movies
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-20">
        {upComingMovies.slice(0,5).map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="text-black text-[18px] hover:scale-105 transition-transform duration-200 p-4xl"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
    </div>
    </div>
  );
}
