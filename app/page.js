import React from 'react';
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
const data = await getTrendingMovies();
const movies = data.results;
return (
    <div className=" px-5 py-8 flex-grow">
   {/* <MovieCard  /> */}
    <h1 className="text-5xl font-black my-5 text-lime-300 underline">
        Trending Movies Today
      </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 bg-white/30 rounded-2xl py-10 px-5">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
