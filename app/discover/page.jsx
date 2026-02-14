import { getPopularMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import React from "react";

export default async function DiscoverPage() {
  const movies = await getPopularMovies(); // server-side fetch
  const movieArray = movies.results; // array of movie objects

  return (
    <div className="grid grid-cols-5 gap-4 p-4xl">
      {movieArray.map(movie => (
        <div key={movie.id} className="text-black text-[18px] hover:scale-105 transition-transform duration-200 p-4xl">
        <MovieCard  movie={movie} />
        </div>
      ))}
    </div>
  );
}
