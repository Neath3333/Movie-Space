import Image from 'next/image'
import React from 'react'
import {fetchMovieById, getUpcomingMovies} from "@/lib/tmdb";                                                

export default async function HeroSlider (){
   const hero = await getUpcomingMovies();
   const movie = await fetchMovieById();
   const heroFetch = hero.results;
  const backdropUrl = hero.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/public/logo1.jpg";
   return(
    <div>
          <div className="px-5 py-8 grow">
            <div className="grid grid-cols-5 gap-4 p-4 container mx-auto px-2 py-8 grow">
              {heroFetch.map((movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  className="text-black text-[18px] hover:scale-105 transition-transform duration-200 p-4xl"
                > 
                  <Image 
                  src={backdropUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
   )
}
