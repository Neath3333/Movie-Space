import { fetchMovieById } from "@/lib/tmdb";
import { getTrendingMovies } from "@/lib/tmdb";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import MovieCard from "@/components/MovieCard";
// import MovieCard from "@/components/MovieCard";

export default async function MoviePage({ params }) {
  //1. Fetch movie details using the ID from the URL
  const data = await getTrendingMovies();
  const movies = data.results;
  const { id } = await params;
  const movie = await fetchMovieById(id);
  //2. poster path
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "//public/logo1.jpg";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/public/logo1.jpg";
  return (
    <div className="relative mx-auto w-[100%]">
      {/* Backdrop Section - Full width with specific height */}
      <div className="relative h-[750px]  bg-center bg-no-repeat flex">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="opacity-85 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      {/* Movie Info Section - Overlapping backdrop */}
      <div className="relative z-10 container mx-auto px-2 py-8 flex-grow">
        <div className="flex gap-8 -mt-130">
          <div className="relative z-20">
            <Image
              src={imageUrl}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              width={300}
              height={450}
            />
          </div>
          <div className="pt-0">
            {/*Movie Info*/}
            <div className="flex-1 text-white">
              <h1 className="font-bold text-4xl">{movie.title}</h1>
              <p className="text-gray-500 mt-2">
                {movie.release_date?.slice(0, 4)}
              </p>
              <p className="mt-4">⭐{movie.vote_average?.toFixed(1)}</p>
              <p className="mt-4 max-w-2xl">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className=" mx-auto px-4 py-8 relative z-10">
        <h2 className="text-5xl font-black my-5 text-lime-300 underline">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 bg-white/30 rounded-2xl py-10 px-5">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
MoviePage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};
