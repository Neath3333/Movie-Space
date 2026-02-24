import { fetchMovieById } from "@/lib/tmdb";
import React from "react";
import PropTypes from "prop-types";

export default async function MoviePage({ params }) {
    //1. Fetch movie details using the ID from the URL
    const { id } = await params;
    const movie = await fetchMovieById(id);
    //2. poster path
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "//public/logo1.jpg";
    return (
        <div className="container mx-auto px-4">
            <div className="flex gap-8">
                <div>
                    <img src={imageUrl}
                         alt={movie.title} 
                         className="w-64 h-96 object-cover rounded-lg shadow-lg"
                         width={300}
                         height={450} 
                        />
                </div>
                <div>
                    {/*Movie Info*/}
                    <div className="flex-1">
                        <h1 className="font-bold text-4xl">{movie.title}</h1>
                        <p className="text-gray-500 mt-2">{movie.release_date?.slice(0,4)}</p>
                        <p className="mt-4">⭐{movie.vote_average?.toFixed(1)}</p>
                        <p className="mt-4 max-w-2xl">{movie.overview}</p>
                    </div>
                </div>
            </div>        
        </div>
    )
}
MoviePage.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
}