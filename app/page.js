import { getTrendingMovies } from "@/lib/tmdb";
import FilmCardWithLikes from "@/components/FilmCardWithLikes";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const data = await getTrendingMovies();
  const movies = data.results.filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
  );

  // Get top 5 movies for hero section carousel (high vote average + backdrop image)
  const featuredMovies = data.results
    .filter(m => m.backdrop_path)
    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <HeroSection featuredMovies={featuredMovies} />

      {/* Trending Movies */}
      <div className="px-5 py-8">
        <h1 className="text-4xl md:text-5xl font-black my-5 text-lime-300">
          Trending Movies Today
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <FilmCardWithLikes key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
