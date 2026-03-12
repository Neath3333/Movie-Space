'use client'

import Image from 'next/image'
import React from 'react'
import {getUpcomingMovies} from "@/lib/tmdb";   
// import PropTypes from 'prop-types'

export default function HeroSection() {
const  [movie, setMovie] = React.useState(null);
const backdropUrl = movie?.backdrop_path
 ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : '/placeholder.jpg';


React.useEffect(() => {
    const fetchUpcomingMovies = async () => {
        const data = await getUpcomingMovies();
        setMovie(data.results[5]);
    };
    fetchUpcomingMovies();
}, []);

return (
    <div className='w-full relative h-[800px]'>
        <Image
        src={backdropUrl}
        alt={movie?.title || 'Movie backdrop'}
        fill
        className='object-cover '
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
    </div>
)
}