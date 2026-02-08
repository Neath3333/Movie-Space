import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

//import MovieCard from '../components/MovieCard';


export default async function Home() {
const data = await getTrendingMovies();
const movies = data.results;
return (
    <div className="p-4">
   {/* <MovieCard  /> */}
    <h1 className="text-2xl font-bold mb-4">
        Trending Movies Today
      </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
