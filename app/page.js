import React from 'react';
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";




export default async function Home() {
const data = await getTrendingMovies();
const movies = data.results;
return (
    <div className="p-4">
   {/* <MovieCard  /> */}
    <h1 className="text-3xl font-black my-10 text-black ">
        Trending Movies Today
      </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
