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
        .then((res) => res.json())
        .then((likes) => {
          const likedIds = new Set(likes.map((like) => like.tmdbId));
          setLikedMovies(likedIds);
        })
        .catch(console.error);
    }
  }, [session]);

  const isLiked = likedMovies.has(movie.id);

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
