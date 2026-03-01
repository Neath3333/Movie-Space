'use client';
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies } from "@/lib/tmdb";

export default function SearchBar(){
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false); 
    const [isLoading, setIsLoading] = React.useState(false);
    async function handleSearch(){
        setIsLoading(true);
        const results = await searchMovies(searchQuery);
        setSearchResults(results.results);
        setShowResults(true);
        setIsLoading(false);
    }
    return(
        <div className="relative">
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
                        <div key={movie.id}>
                            {/* <p>{movie.title}</p>
                            <p>{new Date(movie.release_date).getFullYear()}</p> */}
                        </div>
                    ))}
                    <div>

                    </div>
                </div>

            )}
        </div>
    )
}
