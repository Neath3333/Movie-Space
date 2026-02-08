'use client';
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="rounded-lg bg-white p-20 ">
      <h1 className="text-center font-bold text-4xl">Privacy Policy</h1>
      <h4 className="pt-10 font-black">My Movie Discovery & IMDb Companion</h4>
      <p>
        <strong>Last updated: </strong>January 2026
      </p>
      <div className="pt-5">
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains{" "}
          <strong>My Movie Discovery & IMDb Companion</strong> (“the App”, “the
          Service”) collects, uses, stores, and shares information when you use
          the Service.
        </p>
        <br />
        <p>
          By using the Service, you agree to the collection and use of
          information as described in this Privacy Policy.
        </p>
      </div>
      <div className="pt-5">
        <h2>2. Information We Collect</h2>
        <h3>2.1 Account Information</h3>
        <p>When you create an account, we may collect:</p>
        <ul className="list-disc pl-10">
          <li>Email address</li>
          <li>Encrypted password (we do not store plain-text passwords)</li>
        </ul>
        <p>
          This information is used only for authentication and account
          management.
        </p>
        <h3>2.2 User-Generated Content</h3>
        <p>We collect and store content you choose to create, including:</p>
        <ul className="list-disc pl-10">
          <li>Movie ratings</li>
          <li>Tags</li>
          <li>Short and long reviews</li>
          <li>Watchlist entries</li>
          <li>Taste preferences (liked/disliked genres and movies)</li>
        </ul>
        <p>
          This data is stored in the app’s database and associated with your
          account.
        </p>
        <h3>2.3 Publicly Shared Content</h3>
        <p>If you create a public share link (/share/[reviewId]):</p>
        <ul className="list-disc pl-10">
          <li>
            The linked review content becomes publicly accessible to anyone with
            the URL.
          </li>
          <li>No private account details (such as email) are exposed.</li>
        </ul>
        <p>You control whether a review is shared publicly.</p>
        <h3>2.4 Automatically Collected Information</h3>
        <p>We may collect limited technical information such as:</p>
        <ul>
          <li>Session identifiers (for login)</li>
          <li>Basic request metadata required for normal operation</li>
        </ul>
        <p>We do not intentionally collect precise location data or personal profiling data.</p>
      </div>
      <div className="pt-5">
        <h2>3. Third-Party Data Sources</h2>
        <h3>3.1 Movie Data Providers</h3>
        <p>
          The Service uses third-party APIs (e.g., TMDB) to fetch:
        </p>
        <ul>
          <li>Movie titles</li>
          <li>Posters</li>
          <li>Genres</li>
          <li>Release years</li>
          <li>Global ratings and popularity</li>
        </ul>
        <p>This data is provided by third parties and remains their property.</p>
        <h3>3.2 Imported Review Data</h3>
        <p>If you import reviews from external sources (e.g., previously saved IMDb HTML files):</p>
        <ul>
          <li>The imported data is processed locally and stored in your account.</li>
          <li>No automatic scraping of live websites is performed by the Service.</li>
        </ul>
        <p>You are responsible for ensuring you have the right to import such data.</p>
      </div>
      <div className="pt-5">
        <h2>4. How We Use Your Information</h2>
        <p>
         We use collected information to:
        </p>
        <ul className="list-disc pl-10">
          <li>Provide core features (search, reviews, watchlists, recommendations)</li>
          <li>Personalize movie recommendations based on your taste profile</li>
          <li>Authenticate users and secure accounts</li>
          <li>Generate public review share pages</li>
          <li>Enable optional external sharing (e.g., webhooks)</li>
        </ul>
        <p>
          We do <strong>not</strong> sell or rent your personal data.
        </p>
      </div>
      <div className="pt-5">
        <h2>5. External Sharing & Webhooks</h2>
        <p>If you enable automatic sharing:</p>
        <ul className="list-disc pl-10">
          <li>Review content may be sent to third-party services using URLs you configure (e.g., Discord webhooks).</li>
          <li>The Service only sends the data you explicitly choose to share.</li>
        </ul>
        <p>We are not responsible for how third-party services store or use that data.</p>
      </div>
      <div className="pt-5">
        <h2>6. IMDb-Specific Notice</h2>
        <ul className="list-disc pl-10">
          <li>The Service does not connect directly to IMDb accounts.</li>
          <li>No IMDb credentials are collected or stored.</li>
          <li>Reviews intended for IMDb are generated as text for <strong>manual user submission only.</strong></li>
        </ul>
        <p>Any content posted on IMDb is governed by IMDb’s Privacy Policy and Terms.</p> 
      </div>
      <br />
      <div>
        <h2>7. Data Storage & Security</h2>
        <ul className="list-disc pl-10">
          <li>Data is stored in a local database (e.g., SQLite via Prisma).</li>
          <li>Reasonable technical measures are used to protect stored data.</li>
          <li>However, no system is 100% secure, and we cannot guarantee absolute security.</li>
        </ul>
      </div>
      <br />
      <div>
        <h2>8. Data Retention</h2>
        <p>We retain your data:</p>
        <ul className="list-disc pl-10">
          <li>
           As long as your account remains active
          </li>
          <li>
            Or until you delete content or your account (if supported)
          </li>
        </ul>
        <p>Public share links remain accessible until the associated review is deleted or sharing is disabled.</p>
      </div>
      <br />
      <div>
        <h2>9. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-10">
          <li>Access your data</li>
          <li>Correct or update your data</li>
          <li>Delete your reviews or account</li>
          <li>Stop using the Service at any time</li>
        </ul>
        <p>For student/demo projects, requests may be handled manually.</p>
      </div>
      <br />
      <div>
        <h2>10. Children’s Privacy</h2>
        <p>
          The Service is not intended for children under 13.
        </p>
        <p>We do not knowingly collect personal data from children.</p>
       </div>
      <br />
      <div>
        <h2>11. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time.</p>
        <p>Changes will be reflected by updating the “Last updated” date.</p><br />
        <p>Continued use of the Service means you accept the updated policy.</p>
      </div>
      <br />
      <div>
        <h2>12. Contact</h2>
        <p>If you have questions or concerns about this Privacy Policy, contact the project owner through the project repository or official project page.</p>
      </div>
      <br />
    </div>
  );
}
