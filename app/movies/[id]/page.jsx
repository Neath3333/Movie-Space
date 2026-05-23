import { fetchMovieById } from "@/lib/tmdb";
import { getTrendingMovies } from "@/lib/tmdb";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import FilmCardWithLikes from "@/components/FilmCardWithLikes";
import MovieReviews from "@/components/MovieReviews";

export default async function MoviePage({ params }) {
  //1. Fetch movie details using the ID from the URL
  const data = await getTrendingMovies();
  const movies = data.results;
  const { id } = await params;
  const movie = await fetchMovieById(id);
  //2. poster path
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/logo1.jpg";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/logo1.jpg";
  return (
    <div className="relative mx-auto w-full min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Backdrop Section - Responsive height */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] bg-center bg-no-repeat">
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 -mt-16 sm:-mt-24 md:-mt-32">
          {/* Poster */}
          <div className="relative z-20 mx-auto sm:mx-0 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={movie.title}
              className="w-32 h-48 sm:w-40 sm:h-60 md:w-52 md:h-80 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl"
              width={300}
              height={450}
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
              {movie.title}
            </h1>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
              {movie.release_date?.slice(0, 4)}
              {movie.runtime && ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
            </p>
            <p className="text-lime-400 mt-2 sm:mt-4 text-lg sm:text-xl">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>
            <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto sm:mx-0 line-clamp-4">
              {movie.overview}
            </p>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <MovieReviews movieId={id} movieTitle={movie.title} />
      </div>

      {/* Similar Movies Section */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black my-4 sm:my-5 text-lime-300">
          Similar Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 bg-white/10 rounded-2xl py-6 sm:py-8 px-3 sm:px-5">
          {movies.slice(0, 12).map((movie) => (
            <FilmCardWithLikes key={movie.id} movie={movie} />
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
