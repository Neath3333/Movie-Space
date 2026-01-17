import React from "react";
export default function terms() {
  return (
    <div className="rounded-lg bg-white p-20 ">
      <h1 className="text-center font-bold text-4xl">Terms of Services</h1>
      <h4 className="pt-10 font-black">My Movie Discovery & IMDb Companion</h4>
      <p>
        <strong>Last updated: </strong>January 2026
      </p>
      <div className="pt-5">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using
          <strong> My Movie Discovery & IMDb Companion</strong> (the “Service”,
          “App”, or “Platform”), you agree to be bound by these Terms of Service
          (“Terms”). If you do not agree to these Terms, you must not use the
          Service.
        </p>
      </div>
      <div className="pt-5">
        <h2>2. Description of the Service</h2>
        <p>
          My Movie Discovery & IMDb Companion is a movie discovery and personal
          review application that allows users to:
        </p>
        <ul className="list-disc pl-10">
          <li>
            Search and discover movies using third-party public APIs (such as
            TMDB).
          </li>
          <li>Save movies to a personal watchlist.</li>
          <li>Rate and review movies.</li>
          <li>
            Receive movie recommendations based on personal preferences and
            global ratings.
          </li>
          <li> Create public share links for personal reviews.</li>
          <li>
            Optionally auto-share reviews to external services that provide
            official APIs (e.g., Discord webhooks).
          </li>
          <li>
            Generate IMDb-ready review text for <strong>manual posting by the user</strong>.
          </li>
        </ul>
        <p>
          The Service does not post reviews directly to IMDb or bypass any
          platform restrictions.
        </p>
      </div>
      <div className="pt-5">
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum age required by your
          country) to use this Service. By using the Service, you confirm that
          you meet this requirement.
        </p>
      </div>
      <div className="pt-5">
        <h2>4. User Accounts</h2>
        <p>
          To access certain features (such as reviews, watchlists, and
          recommendations), you may need to create an account.
        </p>
        <br />
        <p>You agree to:</p>
        <ul className="list-disc pl-10">
          <li>Provide accurate and complete information.</li>
          <li>Keep your login credentials secure.</li>
          <li>Rate and review movies.</li>
          <li>
            Accept responsibility for all activities performed under your
            account.
          </li>
        </ul>
        <p>
          We are not responsible for unauthorized access resulting from your
          failure to protect your credentials.
        </p>
      </div>
      <div className="pt-5">
        <h2>5. User Content</h2>
        <h3>5.1 Ownership</h3>
        <p>You retain ownership of any content you create, including:</p>
        <ul className="list-disc pl-10">
          <li>Ratings</li>
          <li>Reviews</li>
          <li>Tags</li>
          <li>Taste preferences</li>
        </ul>
        <h3>5.2 License to the Service</h3>
        <p>
          By submitting content, you grant the Service a{" "}
          <strong>non-exclusive, royalty-free license</strong> to store,
          display, and share your content within the App and through public
          share links you explicitly create.
        </p>
        <h3>5.3 Responsibility</h3>
        <p>You are solely responsible for the content you submit. You agree not to post content that:</p>
        <ul className="list-disc pl-10">
          <li>Is illegal, abusive, or defamatory</li>
          <li>Infringes on intellectual property rights</li>
          <li>Violates the rules of third-party platforms</li>
        </ul>
      </div>
       <div className="pt-5">
        <h2>6. Third-Party Services & APIs</h2>
        <p>
          The Service relies on third-party services, including but not limited to:
        </p>
        <ul className="list-disc pl-10">
          <li>TMDB (The Movie Database) for movie discovery data.</li>
          <li>Infringes on intellectual property rights</li>
          <li>Optional external services such as Discord or custom blog APIs via webhooks.</li>
        </ul>
        <p>
          We do not control these services and are not responsible for:
        </p>
        <ul className="list-disc pl-10">
          <li>Their availability</li>
          <li>Infringes on intellectual property rights</li>
          <li>Accuracy of their data</li>
          <li>Changes to their APIs or policies</li>
        <p>
          Use of third-party services is subject to their respective terms.
        </p>
        </ul>
      </div>
    </div>
  );
}
