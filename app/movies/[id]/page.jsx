import { fetchMovieById } from "@/lib/tmdb";
import React from "react";

export default async function MoviePage({ params }) {
    //1.get id from url
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
        return <div>Movie not found</div>;
    }

    //2. fetch movie data from database or api using the id
    const movie = await fetchMovieById(id);

    //3.render the movie details
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-2">{movie.overview}</p>

        </main>
    );
}