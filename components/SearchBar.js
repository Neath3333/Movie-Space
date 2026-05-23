'use client';
import React, { useEffect, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import Image from "next/image";

export default function SearchBar(){
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const searchRef = useRef(null);

    async function performSearch(query) {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        setIsLoading(true);
        try {
            const url = `/api/search?q=${encodeURIComponent(query)}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                performSearch(searchQuery);
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    function handleClose() {
        setShowResults(false);
        setSearchQuery("");
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className="relative z-50 w-full" ref={searchRef}>
            <div className="flex items-center">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="py-1.5 px-3 w-full text-sm rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
                <SearchIcon
                    className="ml-[-24px] text-gray-500 pointer-events-none"
                    fontSize="small"
                />
            </div>

            {showResults && searchQuery.trim() && (
                <div className="absolute top-full mt-2 right-0 w-full sm:w-72 max-h-80 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200">
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
                                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0">
                                    <Image
                                        src={movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                            : "/placeholder.jpg"}
                                        alt={movie.title}
                                        width={32}
                                        height={48}
                                        className="object-cover rounded w-8 h-12 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-black text-sm sm:text-base truncate">{movie.title}</p>
                                        {movie.release_date && (
                                            <p className="text-xs sm:text-sm text-gray-500">
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
            )}
        </div>
    )
}

