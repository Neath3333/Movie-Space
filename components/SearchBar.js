'use client';
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import Image from "next/image";

export default function SearchBar(){
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleSearch(){
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        try {
            const url = `/api/search?q=${encodeURIComponent(searchQuery)}`;
            console.log("Fetching:", url);
            const response = await fetch(url);
            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers.get("content-type"));

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log("Search results:", data.results?.length || 0);
            setSearchResults(data.results?.slice(0, 5) || []);
            setShowResults(true);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
            setShowResults(true);
        } finally {
            setIsLoading(false);
        }
    }

    function handleClose() {
        setShowResults(false);
        setSearchQuery("");
    }

    return(
        <div className="relative z-50">
            <div className="flex items-center">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e)=> {
                        if (e.key === 'Enter'){
                            handleSearch();
                        }
                    }}
                    type="text"
                    placeholder="Search movies...."
                    className="py-2 px-4 w-64 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
                <SearchIcon
                    onClick={handleSearch}
                    className="ml-[-30px] text-gray-500 cursor-pointer hover:text-lime-600"
                />
            </div>

            {/* Dropdown Results */}
            {showResults && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-transparent"
                        onClick={handleClose}
                    />

                    {/* Results Dropdown */}
                    <div className="absolute top-full mt-2 right-0 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">
                                Searching...
                            </div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <Link
                                    href={`/movies/${movie.id}`}
                                    key={movie.id}
                                    onClick={handleClose}
                                    className="block"
                                >
                                    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0">
                                        <Image
                                            src={movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                : "/placeholder.jpg"}
                                            alt={movie.title}
                                            width={40}
                                            height={60}
                                            className="object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-black truncate">{movie.title}</p>
                                            {movie.release_date && (
                                                <p className="text-sm text-gray-500">
                                                    {new Date(movie.release_date).getFullYear()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No results found
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

