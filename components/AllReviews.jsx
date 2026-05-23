"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Check, Film, Pencil, Star, Trash2, X } from "lucide-react";

function formatReviewDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Saved";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReviewAuthor(review) {
  if (review.authorName) {
    return review.authorName;
  }

  if (review.user?.name) {
    return review.user.name;
  }

  if (review.user?.email) {
    return review.user.email.split("@")[0];
  }

  return "Movie fan";
}

function mapReview(review) {
  return {
    id: review.id,
    authorName: review.authorName || "",
    author: getReviewAuthor(review),
    movieTitle: review.movieTitle,
    tmdbId: review.tmdbId,
    rating: Number(review.rating),
    content: review.content || "",
    createdAt: formatReviewDate(review.createdAt),
    canManage: Boolean(review.canManage),
  };
}

function StarMeter({ rating, size = 18 }) {
  const normalizedRating = Math.max(0, Math.min(rating, 10));

  return (
    <div className="inline-flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starFill = Math.max(0, Math.min(normalizedRating - index * 2, 2));
        const fillWidth = `${(starFill / 2) * 100}%`;

        return (
          <span
            key={index}
            className="relative inline-flex text-white/35"
            style={{ width: size, height: size }}
          >
            <Star size={size} />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden text-lime-300"
              style={{ width: fillWidth }}
            >
              <Star size={size} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

StarMeter.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number,
};

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <StarMeter rating={rating} />
      <span className="ml-2 text-sm font-semibold text-white">
        {rating}/10
      </span>
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

function StarRatingInput({ rating, onChange }) {
  const starControlRef = useRef(null);
  const [hoverRating, setHoverRating] = useState(null);
  const displayedRating = hoverRating ?? rating;

  function getPointerRating(event) {
    const rect = starControlRef.current?.getBoundingClientRect();

    if (!rect) {
      return rating;
    }

    const pointerX = Math.max(
      0,
      Math.min(event.clientX - rect.left, rect.width)
    );
    const score = Math.ceil((pointerX / rect.width) * 10);

    return Math.max(1, Math.min(score, 10));
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange(Math.max(1, rating - 1));
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onChange(Math.min(10, rating + 1));
    }
  }

  return (
    <div className="mt-3 flex items-center gap-3">
      <div
        ref={starControlRef}
        role="slider"
        tabIndex={0}
        aria-label="Review rating"
        aria-valuemin={1}
        aria-valuemax={10}
        aria-valuenow={rating}
        aria-valuetext={`${rating} out of 10`}
        onClick={(event) => onChange(getPointerRating(event))}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHoverRating(null)}
        onMouseMove={(event) => setHoverRating(getPointerRating(event))}
        className="w-fit cursor-pointer rounded-md outline-none transition focus-visible:ring-2 focus-visible:ring-lime-300"
      >
        <div className="pointer-events-none">
          <StarMeter rating={displayedRating} size={32} />
        </div>
      </div>
      <span className="rounded-full bg-black/45 px-3 py-1 text-sm font-bold text-lime-300">
        {displayedRating}/10
      </span>
    </div>
  );
}

StarRatingInput.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editRating, setEditRating] = useState(8);
  const [editText, setEditText] = useState("");
  const [busyReviewId, setBusyReviewId] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadReviews() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/reviews?all=true");

        if (!response.ok) {
          throw new Error("Failed to load reviews");
        }

        const data = await response.json();

        if (!ignore) {
          setReviews(data.map(mapReview));
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);

        if (!ignore) {
          setMessage(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      ignore = true;
    };
  }, []);

  function startEditing(review) {
    setEditingReviewId(review.id);
    setEditAuthorName(review.authorName);
    setEditRating(review.rating);
    setEditText(review.content);
    setMessage("");
  }

  function stopEditing() {
    setEditingReviewId(null);
    setEditAuthorName("");
    setEditRating(8);
    setEditText("");
  }

  async function handleUpdateReview(event, reviewId) {
    event.preventDefault();
    setMessage("");

    if (!editText.trim()) {
      setMessage("Write a review before saving.");
      return;
    }

    setBusyReviewId(reviewId);

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: editRating,
          content: editText.trim(),
          authorName: editAuthorName.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update review");
      }

      const updatedReview = mapReview(data);

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        )
      );
      stopEditing();
      setMessage("Review updated.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusyReviewId(null);
    }
  }

  async function handleDeleteReview(reviewId) {
    const confirmed = window.confirm("Delete this review?");

    if (!confirmed) {
      return;
    }

    setMessage("");
    setBusyReviewId(reviewId);

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete review");
      }

      setReviews((currentReviews) =>
        currentReviews.filter((review) => review.id !== reviewId)
      );

      if (editingReviewId === reviewId) {
        stopEditing();
      }

      setMessage("Review deleted.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusyReviewId(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 text-white">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-lime-300 underline">
            User Reviews
          </h1>
          <p className="mt-2 text-sm text-white/70">
            All saved movie reviews from the community.
          </p>
        </div>
        <p className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          {isLoading ? "Loading..." : `${reviews.length} reviews`}
        </p>
      </div>

      {message && (
        <p className="mb-4 rounded-lg border border-lime-300/20 bg-black/45 px-4 py-3 text-sm font-semibold text-lime-100">
          {message}
        </p>
      )}

      {!isLoading && reviews.length === 0 ? (
        <div className="rounded-lg border border-white/15 bg-black/45 p-6">
          No saved reviews yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-white/15 bg-black/45 p-5 backdrop-blur-md"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
                    <Film size={16} />
                    <Link
                      href={`/movies/${review.tmdbId}`}
                      className="font-semibold text-lime-200 transition hover:text-lime-100"
                    >
                      {review.movieTitle}
                    </Link>
                  </div>
                  <h2 className="text-lg font-bold">{review.author}</h2>
                  <p className="text-xs uppercase tracking-wide text-white/50">
                    Saved review - {review.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <RatingStars rating={review.rating} />
                  {review.canManage && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(review)}
                        disabled={busyReviewId === review.id}
                        className="inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-2 text-xs font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={busyReviewId === review.id}
                        className="inline-flex items-center gap-1 rounded-md bg-red-500/80 px-3 py-2 text-xs font-bold transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {editingReviewId === review.id ? (
                <form
                  onSubmit={(event) => handleUpdateReview(event, review.id)}
                  className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4"
                >
                  <label
                    className="block text-sm font-semibold"
                    htmlFor={`all-edit-name-${review.id}`}
                  >
                    Name
                  </label>
                  <input
                    id={`all-edit-name-${review.id}`}
                    value={editAuthorName}
                    onChange={(event) => setEditAuthorName(event.target.value)}
                    maxLength={60}
                    placeholder="Name shown on your review"
                    className="mt-2 w-full rounded-md border border-white/20 bg-black/45 px-3 py-2 text-white outline-none transition focus:border-lime-300"
                  />

                  <fieldset className="mt-4">
                    <legend className="text-sm font-semibold">Rating</legend>
                    <StarRatingInput
                      rating={editRating}
                      onChange={setEditRating}
                    />
                  </fieldset>

                  <label
                    className="mt-4 block text-sm font-semibold"
                    htmlFor={`all-edit-review-${review.id}`}
                  >
                    Review
                  </label>
                  <textarea
                    id={`all-edit-review-${review.id}`}
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none rounded-md border border-white/20 bg-black/45 px-3 py-2 text-white outline-none transition focus:border-lime-300"
                  />

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={busyReviewId === review.id}
                      className="inline-flex items-center gap-2 rounded-md bg-lime-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Check size={16} />
                      {busyReviewId === review.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={stopEditing}
                      disabled={busyReviewId === review.id}
                      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-sm leading-6 text-white/80">
                  {review.content || "No written review."}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
