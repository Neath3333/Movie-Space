import React from "react";
export default function terms() {
  return (
    <div className="rounded-lg bg-white p-20 ">
      <h1 className="text-center font-bold text-2xl">Terms of Services</h1>
      <h4 className="pt-10">My Movie Discovery & IMDb Companion</h4>
      <p>
        <strong>Last updated: </strong>January 2026
      </p>
      <div>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using{" "}
          <strong>My Movie Discovery & IMDb Companion</strong> (the “Service”,
          “App”, or “Platform”), you agree to be bound by these Terms of Service
          (“Terms”). If you do not agree to these Terms, you must not use the
          Service.
        </p>
      </div>
      <div>
        <h2>2. Description of the Service</h2>
        <p>
          My Movie Discovery & IMDb Companion is a movie discovery and personal
          review application that allows users to: </p> 
          <ul>
            <li>Search and discover movies using third-party public APIs (such as TMDB).</li>
            <li>Save movies to a personal watchlist.</li>
            <li>Rate and review movies.</li>
            <li> Receive movie recommendations based on personal preferences and global ratings.</li>
            <li> Create public share links for personal reviews.</li>
            <li>Optionally auto-share reviews to external services that provide official APIs (e.g., Discord
          webhooks).</li>
              <li> Generate IMDb-ready review text for manual posting by the
          user. </li>
          </ul>
            <p>The Service does not post reviews directly to IMDb or bypass any
          platform restrictions.</p>
      </div>
      <div>
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age required by your
          country) to use this Service. By using the Service, you confirm that
          you meet this requirement.
        </p>
      </div>
    </div>
  );
}
