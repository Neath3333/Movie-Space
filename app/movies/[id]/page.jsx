import { fetchMovieById } from "@/lib/tmdb";
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
// import MovieCard from "@/components/MovieCard"; 

export default async function MoviePage({ params }) {
    //1. Fetch movie details using the ID from the URL
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
        <div className="">
            <div className="w-full h-[-50vh]">
            <Image
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-85"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent -z-10"></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="flex gap-8">
                <div>
                    <Image src={imageUrl}
                         alt={movie.title}
                         className="w-64 h-96 object-cover rounded-lg shadow-lg "
                         width={300}
                         height={450}
                        />
                </div>
                <div>
                    {/*Movie Info*/}
                    <div className="flex-1 text-white">
                        <h1 className="font-bold text-4xl">{movie.title}</h1>
                        <p className="text-gray-500 mt-2">{movie.release_date?.slice(0,4)}</p>
                        <p className="mt-4">⭐{movie.vote_average?.toFixed(1)}</p>
                        <p className="mt-4 max-w-2xl">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}
MoviePage.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
    }).isRequired,
}