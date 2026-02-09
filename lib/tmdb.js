const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  console.log("Fetching from TMDB URL:", url.toString()); 7// Debugging line to see the full URL being fetched

  const response = await fetch(url);

  if(!response.ok) {
    console.error("TMDB Error status:", response.status); // Log the error response text
    console.error("TMDB Error text:", await response.text());
    throw new Error(`TMDB request failed: ${response.status}`);
 }
  // if (!response.ok) throw new Error("TMDB request failed");

  return response.json();
}

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week");
}

export async function getPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}

export async function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming");
}

export async function searchMovies(query) {
  return fetchFromTMDB("/search/movie", { query });
}
