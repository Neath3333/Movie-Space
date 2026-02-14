import React from 'react';

export default function About() {
  return (
    <div>
      {/* Hero Section - Subtle purple background */}
      <div className="bg-purple-50 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-4 drop-shadow-lg">
            About Movie Space
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto drop-shadow-lg">
            Your personal guide to discovering films you will actually love
          </p>
        </div>
      </div>

      {/* Main Content - Clean white background */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            What is Movie Space?
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed drop-shadow-lg">
            Movie Space brings together millions of movies from TMDB&apos;s database, real reviews from our community, and smart recommendations—all in one simple experience. We are here to take the overwhelm out of choosing what to watch.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            Why We Built It
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed drop-shadow-lg">
            Finding great movies should not feel like work. With thousands of films released every year and endless scrolling across streaming platforms, it is easy to spend more time browsing than watching. Whether you are looking for trending movies, exploring hidden gems, or sharing reviews to help others, Movie Space makes discovering films fun again.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            Everything in One Place
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed drop-shadow-lg">
            Browse trending movies, search for specific films or actors, dive into genres, or let our recommendations surprise you. Add movies to your watchlist, leave reviews for the community, and find films that match your taste—no more guessing, no more wasting time.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            A Community of Real Movie Lovers
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed drop-shadow-lg">
            What makes Movie Space different is our community. Every review comes from real people who actually watched the film, not critics or algorithms. Follow users with similar taste, see what your friends are rating, and build a profile that reflects your genuine preferences. It is not just about finding any movie—it is about finding the right movie for you.
          </p>
        </section>

        {/* CTA Section - Subtle accent */}
        <section className="bg-gray-50 rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed mb-6 drop-shadow-lg">
            Join thousands of movie lovers who have made Movie Space their home for film discovery. Stop scrolling endlessly through streaming platforms and start discovering films you will genuinely enjoy.
          </p>
          <p className="text-xl font-semibold text-purple-700 drop-shadow-lg">
            Your next favorite movie is waiting.
          </p>
        </section>
      </div>
    </div>
  );
}