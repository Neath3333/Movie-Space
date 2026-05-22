"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FilmCard from "./FilmCard";

export default function FilmCardWithLikes({ movie }) {
  const { data: session } = useSession();
  const [likedMovies, setLikedMovies] = useState(new Set());

  // Fetch user's liked movies
  useEffect(() => {
    if (session?.user) {
      fetch("/api/likes")
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to fetch likes:", res.status, errorText);
            return [];
          }
          return res.json();
        })
        .then((likes) => {
          // Store as numbers to match movie.id from TMDB
          const likedIds = new Set(likes.map((like) => Number(like.tmdbId)));
          setLikedMovies(likedIds);
        })
        .catch(console.error);
    }
  }, [session]);

  const isLiked = likedMovies.has(Number(movie.id));

  const handleLikeToggle = (tmdbId, newState) => {
    setLikedMovies((prev) => {
      const updated = new Set(prev);
      if (newState) {
        updated.add(tmdbId);
      } else {
        updated.delete(tmdbId);
      }
      return updated;
    });
  };

  return (
    <FilmCard
      movie={movie}
      isLiked={isLiked}
      onLikeToggle={handleLikeToggle}
    />
  );
}
