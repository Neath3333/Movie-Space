'use client'

// import Image from 'next/image'
// import {useEffect, useState } from "react"
import React from 'react'
import {getUpcomingMovies} from "@/lib/tmdb"; 
import MovieCard from "@/components/MovieCard";                                                                 



export default async function HeroSlider (){
   const hero = await getUpcomingMovies();
   const heroFetch = hero.results;

   return(
    <div>
          <div className="px-5 py-8 grow">
            <div className="grid grid-cols-5 gap-4 p-4 container mx-auto px-2 py-8 grow">
              {heroFetch.map((movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  className="text-black text-[18px] hover:scale-105 transition-transform duration-200 p-4xl"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
   )
}
