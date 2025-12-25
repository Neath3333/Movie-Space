import React from 'react';


export default function Home() {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const fetchMovies = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();
        return data.results;
    };
return (
    <div>
    </div>
  );
}
