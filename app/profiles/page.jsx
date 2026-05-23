'use client'
import Profile from "../../components/profile";
import React, { useState, useEffect } from "react";
import {useSession} from "next-auth/react"
import FilmCard from "@/components/FilmCard";

export default function ProfilePage() {
    const {data: session , status} = useSession();
    const [likedMovies, setLikedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user) {
            fetch('/api/likes')
                .then(res => res.json())
                .then(likes => {
                    const movies = likes.map(like => ({
                        id: like.tmdbId,
                        title: like.movieTitle,
                        poster_path: like.moviePoster,
                    }));
                    setLikedMovies(movies);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [session]);

    const handleLikeToggle = (tmdbId, newState) => {
        if (!newState) {
            setLikedMovies(prev => prev.filter(movie => movie.id !== tmdbId));
        }
    };

    if (status === "loading"){
        return <div>Loading...</div>;
    }
    if(!session){
        return <div>Please sign in to view your profile</div>;
    }

    const user = {
        name: session.user?.name || "User",
        imageUrl: session.user?.image || "https://randomuser.me/api/potraits/men/32.jpg"
    };

    return (
        <div className="px-4 sm:px-6 max-w-7xl mx-auto py-20">
            <div className="flex flex-col items-center justify-center w-full bg-white/30 p-4 sm:p-10 rounded-lg">
                <Profile name={user.name} imageUrl={user.imageUrl} />
                <div className="mt-4 text-center">
                    <p className="text-sm sm:text-xl">Email: {session.user?.email}</p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">Saved Movies</h2>
                {loading ? (
                    <div className="text-center py-10">Loading saved movies...</div>
                ) : likedMovies.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No saved movies yet</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                        {likedMovies.map(movie => (
                            <FilmCard
                                key={movie.id}
                                movie={movie}
                                isLiked={true}
                                onLikeToggle={handleLikeToggle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}