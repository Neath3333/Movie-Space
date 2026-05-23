const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url);
  if(!response.ok) {
    console.error("TMDB Error status:", response.status); 
    console.error("TMDB Error text:", await response.text());
    throw new Error(`TMDB request failed: ${response.status}`);
 }
  // if (!response.ok) throw new Error("TMDB request failed");

  return response.json();
}

export async function getTrendingMovies() {
  let allMovies = [];

  for (let page = 1; page <= 3; page++) {
    const data = await fetchFromTMDB("/trending/movie/day", { page });
    allMovies = [...allMovies, ...data.results];
  }
  return { results: allMovies };
}

export async function getPopularMovies() {
  let allMovies = [];

  for (let page = 1; page <= 3; page++) {
    const data = await fetchFromTMDB("/movie/popular", { page });
    allMovies = [...allMovies, ...data.results];
  }
  return { results: allMovies };
}

export async function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming");
}

export async function searchMovies(query) {
  return fetchFromTMDB("/search/movie", { query });
}

export async function fetchMovieById(id) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieGenres() {
  const data = await fetchFromTMDB("/genre/movie/list");
  return data.genres || [];
}

// Get movies by genre with pagination
export async function getMoviesByGenre(genreId, page = 1) {
  return fetchFromTMDB("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
}

// Get all genres with movies for recommendation filtering
export async function getGenresForDiscovery() {
  const genres = await getMovieGenres();
  // Add "All" option for showing all recommendations
  return [
    { id: 0, name: "All" },
    ...genres,
  ];
}

// Extract primary genre from movie (first genre in array)
export function getPrimaryGenre(movie) {
  return movie.genre_ids?.[0] || movie.genres?.[0]?.id || null;
}

// Check if movie belongs to a genre
export function movieHasGenre(movie, genreId) {
  if (genreId === 0) return true; // "All" genre
  const genreIds = movie.genre_ids || movie.genres?.map(g => g.id) || [];
  return genreIds.includes(genreId);
}

// Get genre name by ID from cached genre list
let genreCache = null;
export async function getGenreNameById(genreId) {
  if (!genreCache) {
    genreCache = await getMovieGenres();
  }
  const genre = genreCache.find(g => g.id === genreId);
  return genre?.name || "Unknown";
}
