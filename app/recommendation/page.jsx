import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getRecommendations, getFallbackRecommendations } from "@/lib/recommendations";
import { getGenresForDiscovery } from "@/lib/tmdb";
import RecommendationFeed from "@/components/RecommendationFeed";
import GenreChips from "@/components/GenreChips";

export default async function RecommendationPage({
  searchParams,
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  // Await searchParams in Next.js 15+
  const params = await searchParams;

  // Handle both string and array for searchParams
  const genreParam = params?.genre;
  const genreId = genreParam ? parseInt(Array.isArray(genreParam) ? genreParam[0] : genreParam) : 0;

  // Get personalized recommendations or fallback for new users
  const recommendations = await getRecommendations(
    session.user.id,
    genreId === 0 ? null : genreId,
    60
  );

  // If no personalized recommendations, use fallback
  const movies = recommendations.length > 0
    ? recommendations
    : await getFallbackRecommendations(60);

  // Get available genres for filtering
  const genres = await getGenresForDiscovery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-lime-300">
              Recommended for You
            </h1>
            <p className="text-gray-400 mt-2">
              {movies.length > 0 && recommendations.length > 0
                ? "Based on your likes and reviews"
                : "Popular movies to get you started"}
            </p>
          </div>
        </div>

        <GenreChips
          genres={genres}
          selectedGenre={genreId}
        />

        <RecommendationFeed
          movies={movies}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}