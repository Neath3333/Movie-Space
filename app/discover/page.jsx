import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "../lib/tmdb";
import React from "react";

export default async function DiscoverPage() {
  const movies = await getPopularMovies(); // server-side fetch
  const movieArray = movies.results; // array of movie objects

  return (
    <div className="grid grid-cols-4 gap-4">
      {movieArray.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
