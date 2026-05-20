'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import FilmCardWithLikes from "@/components/FilmCardWithLikes";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Search Movies
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter movie title..."
              className="flex-1 px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-lime-400 shadow-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-lg"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searched && (
          <div>
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-lime-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Searching for movies...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6 text-center">
                  Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {results.map((movie) => (
                    <FilmCardWithLikes key={movie.id} movie={movie} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">No results found for "{query}"</p>
                <p className="text-gray-500 mt-2">Try different keywords</p>
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Search for your favorite movies above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
