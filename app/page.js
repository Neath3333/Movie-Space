import React from 'react';
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";




export default async function Home() {
const data = await getTrendingMovies();
const movies = data.results;
return (
    <div className="">
   {/* <MovieCard  /> */}
    <h1 className="text-5xl font-black my-10 text-lime-300 underline">
        Trending Movies Today
      </h1>
      <div className=" bg-white rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 ">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      </div> 
    </div>
  );
}
