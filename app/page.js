import React from 'react';
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
// import { login } from '@/lib/auth';
// import HeroSection from "@/components/hero_section";

export default async function Home() {
const data = await getTrendingMovies();
const movies = data.results.filter((movie, index, self) =>                                       
    index === self.findIndex((m) => m.id === movie.id));

return (
  <div>
    {/* <HeroSection/> */}
    <div className=" px-5 py-8 grow">
   {/* <MovieCard  /> */}
    <h1 className="text-5xl font-black my-5 text-lime-300 underline">
        Trending Movies Today
      </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 bg-white/30 rounded-2xl py-10 px-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div> 
    <div>
      {" "}
      <p>You are not sign in </p>
      {/* <button onClick={() => login('Google')}>Sign In with Google</button> */}
    </div>
    </div>
  );
}
