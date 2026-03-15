'use client'

import Image from 'next/image'
import {useEffect, useState } from "react"
import React from 'react'
import {getUpcomingMovies} from "@/lib/tmdb";  
import PropTypes from 'prop-types'

PropTypes SlideData {
    id:Number;
    title:String;
    image_url: String;
}
export default function HeroCarousel({slides}:{slides:SlideData[]}){
    const [current ,setCurrent ] = useState(0);

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
