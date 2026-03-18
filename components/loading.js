'use client'
import { useEffect, useState , React } from "react";
import { getTrendingMovies, getPopularMovies, getUpcomingMovies } from '@/lib/tmdb';

export default function Spinner() {
    const [data, setData] = useState({ trending: [], popular: [], upcoming: [] });
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadAllMovies() {
            try {
                const [trending, popular, upcoming] = await Promise.all([
                    getTrendingMovies(),
                    getPopularMovies(),
                    getUpcomingMovies()
                ]);
                setData({
                    trending: trending.results,
                    popular: popular.results,
                    upcoming: upcoming.results
                });
            } finally {
                setIsLoading(false);
            }
        }
        loadAllMovies();
    }, []);

    if (loading) return <div className="spinner">Loading...</div>;
    return (
        <div className="movie-container">
            <section>
                <h2>Trending</h2>
                <div className="movie-grid">
                    {data.trending.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Popular</h2>
                <div className="movie-grid">
                    {data.popular.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Upcoming</h2>
                <div className="movie-grid">
                    {data.upcoming.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}