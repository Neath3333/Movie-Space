import { prisma } from "./prisma";
import { getPopularMovies, getMoviesByGenre } from "./tmdb";

/**
 * Recommendation scoring algorithm
 * Scores movies based on:
 * 1. User's liked movies' genres (high weight)
 * 2. User's review ratings for genres (medium weight)
 * 3. TMDB popularity and vote average (base weight)
 */

// Scoring weights
const WEIGHTS = {
  likedGenre: 10,      // High weight for genres from liked movies
  reviewedGenre: 5,    // Medium weight for genres from highly-rated reviews
  popularity: 0.5,     // Small boost for popular movies
  voteAverage: 2,      // Boost for highly-rated movies on TMDB
  newRelease: 1,       // Small boost for recent movies
};

/**
 * Fetch movie details in batch to reduce API calls
 */
async function fetchMovieDetailsBatch(tmdbIds) {
  const uniqueIds = [...new Set(tmdbIds)];
  const movies = await Promise.all(
    uniqueIds.map(async (id) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    })
  );

  // Create a map for quick lookup
  const movieMap = {};
  for (const movie of movies) {
    if (movie) {
      movieMap[movie.id] = movie;
    }
  }
  return movieMap;
}

/**
 * Get user's genre affinity scores based on likes and reviews
 */
async function getUserGenreProfile(userId) {
  // Get user's liked movies with their genre data
  const likes = await prisma.like.findMany({
    where: { userId },
    select: { tmdbId: true },
  });

  // Get user's reviews with ratings
  const reviews = await prisma.review.findMany({
    where: { userId },
    select: { tmdbId: true, rating: true },
  });

  const genreScores = {};
  const genreWeights = {};

  // Batch fetch all movie details at once
  const allTmdbIds = [
    ...likes.map(l => l.tmdbId),
    ...reviews.filter(r => r.rating >= 7).map(r => r.tmdbId),
  ];

  if (allTmdbIds.length === 0) {
    return {}; // No genre data for new users
  }

  const movieDetailsMap = await fetchMovieDetailsBatch(allTmdbIds);

  // Process likes - high weight for genres from liked movies
  for (const like of likes) {
    const movieDetails = movieDetailsMap[like.tmdbId];
    if (movieDetails?.genres) {
      for (const genre of movieDetails.genres) {
        genreScores[genre.id] = (genreScores[genre.id] || 0) + WEIGHTS.likedGenre;
        genreWeights[genre.id] = (genreWeights[genre.id] || 0) + 1;
      }
    }
  }

  // Process reviews - weight by rating (higher rating = more influence)
  for (const review of reviews) {
    if (review.rating >= 7) {
      // Only consider positive reviews (7+)
      const movieDetails = movieDetailsMap[review.tmdbId];
      if (movieDetails?.genres) {
        const ratingWeight = (review.rating / 10) * WEIGHTS.reviewedGenre;
        for (const genre of movieDetails.genres) {
          genreScores[genre.id] = (genreScores[genre.id] || 0) + ratingWeight;
          genreWeights[genre.id] = (genreWeights[genre.id] || 0) + 1;
        }
      }
    }
  }

  // Normalize scores by weight (number of data points)
  for (const genreId in genreScores) {
    if (genreWeights[genreId] > 1) {
      genreScores[genreId] = genreScores[genreId] / Math.sqrt(genreWeights[genreId]);
    }
  }

  return genreScores;
}

/**
 * Score a single movie based on user's genre profile
 */
function scoreMovie(movie, userGenreProfile) {
  let score = 0;

  // Add genre affinity score
  if (movie.genre_ids && userGenreProfile) {
    for (const genreId of movie.genre_ids) {
      score += userGenreProfile[genreId] || 0;
    }
  }

  // Add TMDB popularity boost (normalized 0-1 scale, typically 0-1000)
  const popularityScore = Math.min(movie.popularity || 0, 1000) / 2000 * WEIGHTS.popularity;
  score += popularityScore;

  // Add vote average boost (typically 0-10)
  const voteScore = (movie.vote_average || 0) / 10 * WEIGHTS.voteAverage;
  score += voteScore;

  // Add small boost for recent releases (last 2 years)
  if (movie.release_date) {
    const releaseYear = new Date(movie.release_date).getFullYear();
    const currentYear = new Date().getFullYear();
    if (releaseYear >= currentYear - 2) {
      score += WEIGHTS.newRelease;
    }
  }

  // Base score to ensure all movies have some value
  score += 1;

  return Math.round(score * 100) / 100; // Round to 2 decimals
}

/**
 * Get personalized recommendations for a user
 * @param {string} userId - User ID
 * @param {number|null} genreId - Optional genre filter (0 = all genres)
 * @param {number} limit - Maximum number of recommendations
 */
export async function getRecommendations(userId, genreId = null, limit = 50) {
  // Get user's genre profile
  const userGenreProfile = await getUserGenreProfile(userId);

  // Fetch candidate movies
  let movies = [];

  if (genreId && genreId !== 0) {
    // Fetch movies by specific genre
    for (let page = 1; page <= 3; page++) {
      const data = await getMoviesByGenre(genreId, page);
      movies.push(...data.results);
    }
  } else {
    // Fetch popular movies as candidates
    const data = await getPopularMovies();
    movies = data.results;
  }

  // Get user's liked and reviewed tmdbIds to exclude
  const likedIds = await prisma.like.findMany({
    where: { userId },
    select: { tmdbId: true },
  });

  const reviewedIds = await prisma.review.findMany({
    where: { userId },
    select: { tmdbId: true },
  });

  const excludedIds = new Set([
    ...likedIds.map(l => l.tmdbId),
    ...reviewedIds.map(r => r.tmdbId),
  ]);

  // Score and filter movies
  const scoredMovies = movies
    .filter(movie => !excludedIds.has(movie.id))
    .map(movie => ({
      ...movie,
      recommendationScore: scoreMovie(movie, userGenreProfile),
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit);

  return scoredMovies;
}

/**
 * Get fallback recommendations for users with no activity
 */
export async function getFallbackRecommendations(limit = 50) {
  const data = await getPopularMovies();

  return data.results
    .map(movie => ({
      ...movie,
      recommendationScore: (movie.vote_average || 0) / 2 + (movie.popularity || 0) / 500,
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit);
}