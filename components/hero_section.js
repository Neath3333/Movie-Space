'use client'

import Image from 'next/image'
import React from 'react'
import {getTrendingMovies} from "@/lib/tmdb";   
// import PropTypes from 'prop-types'

export default function HeroSection() {
const [trendingMovies, setTrendingMovies] = React.useState([]);

React.useEffect(() => {
    const fetchTrendingMovies = async () => {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
    };
    fetchTrendingMovies();
}, []);

return (
    <div>
        <Image
        src="{movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}"
        alt="Hero Image"
        width={500}
        height={300}
        />
    </div>
)
}