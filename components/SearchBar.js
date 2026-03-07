'use client';
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies } from "@/lib/tmdb";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar(){
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false); 
    const [isLoading, setIsLoading] = React.useState(false);
    async function handleSearch(){
        setIsLoading(true);
        const results = await searchMovies(searchQuery);
        setSearchResults(results.results.slice(0,5));
        setShowResults(true);
        setIsLoading(false);
    }
    return(
        <div className="">
            <input 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e)=> {
                if (e.key === 'Enter'){
                    handleSearch();
                }
            }}
            
            type="text" 
            placeholder="Search titles...." 
            className="py-2 px-5 ml-15 rounded-xl bg-white focus:outline-none" 
            />
            <SearchIcon onClick={handleSearch} className="ml-2 absolute right-3 text-gray-500 top-2 cursor-pointer"/>
            {isLoading &&(
                <div>

                </div>
            )}
            {showResults && searchResults.length > 0 && (
                <div>
                    {searchResults.map((movie) => (
                        <Link href={`/movies/${movie.id}`} key={movie.id}
                        className="">
                            <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg ">
                                <Image
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/placeholder.jpg"}
                                    alt={movie.title}
                                    width={50}
                                    height={75}
                                    className="object-cover rounded"
                                />
                                <span>{movie.title}</span>
                            </div>
                            
                        </Link>
                    
                    ))}
                    <div>

                    </div>
                </div>

            )}
        </div>
    )
}

