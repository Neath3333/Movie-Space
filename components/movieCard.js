'use client';
import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#000] py-20'>
      <div className='mx-auto bg-white rounded-3xl shadow-xl'>
        <div className="rounded-3xl max-w-[270px] shadow-sm bg-white">
          <Image
            src={imageUrl}
            className="rounded-t-3xl justify-center h-56 grid object-cover"
            width={270}
            height={380}
            alt={movie.title}
          /> 
          <div className="group px-5 py-3 grid z-10">
            <a
              href={`${movie.link}`}
              className="group-hover:text-cyan-700 font-bold md:text-2xl line-clamp-2"
            >
              {movie.title}
            </a>
            <span className="text-slate-400 pt-2 font-semibold">
              ({movie.release_date?.split("-")[0]})
            </span>
            <div className="h-14">
              <span className="line-clamp-3 py-2 h-14 leading-6 text-sm font-light leading-relaxed">
                {movie.overview}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string, 
    overview: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};