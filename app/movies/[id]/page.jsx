import { fetchMovieById } from "@/lib/movies";
import React from "react";
import PropTypes from "prop-types";

export default async function MoviePage ({ params }) {
    //1.get id from url
    const {id} = params;
    //2. fetch movie data from database or api using the id
    const movie = await fetchMovieById(id);

    //3.render the movie details 
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-2">{movie.description}</p>

        </main>
    )
}

MoviePage.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
}