"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { Check, Pencil, Send, Star, Trash2, X } from "lucide-react";

const sampleReviews = [
  {
    author: "Maya Chen",
    rating: 9,
    content:
      "A confident watch with strong pacing, memorable scenes, and a final act that stays with you.",
  },
  {
    author: "Jordan Lee",
    rating: 8,
    content:
      "The performances carry the movie. It has a few slow spots, but the overall mood works well.",
  },
  {
    author: "Avery Brooks",
    rating: 7,
    content:
      "Worth watching for the visuals and soundtrack. The story is familiar, but it lands enough emotional moments.",
  },
  {
    author: "Sam Rivera",
    rating: 10,
    content:
      "One of those movies I would recommend without overthinking it. Great energy from start to finish.",
  },
  {
    author: "Nina Patel",
    rating: 6,
    content:
      "Fun in pieces, though some scenes needed more time to breathe. Still a solid pick for movie night.",
  },
  {
    author: "Leo Grant",
    rating: 8,
    content:
      "The cast has great chemistry and the direction gives the bigger moments a real sense of scale.",
  },
];

function getSeededReviews(movieId) {
  const seed = Math.abs(Number(movieId) || 0);

  return [0, 1, 2].map((offset) => {
    const review = sampleReviews[(seed + offset * 2) % sampleReviews.length];
    return {
      ...review,
      id: `sample-${seed}-${offset}`,
      createdAt: ["Today", "Yesterday", "3 days ago"][offset],
    };
  });
}

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

function mapDatabaseReview(review) {
  return {
    id: review.id,
    authorName: review.authorName || "",
    author: getReviewAuthor(review),
    rating: Number(review.rating),
    content: review.content || "",
    createdAt: formatReviewDate(review.createdAt),
    canManage: Boolean(review.canManage),
    saved: true,
  };
}

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-lime-300">
      <StarMeter rating={rating} size={18} />
      <span className="ml-2 text-sm font-semibold text-white">
        {rating}/10
      </span>
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

function StarMeter({ rating, size = 32 }) {
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
          <StarMeter rating={displayedRating} />
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

export default function MovieReviews({ movieId, movieTitle }) {
  const { status } = useSession();
  const seededReviews = useMemo(() => getSeededReviews(movieId), [movieId]);
  const [savedReviews, setSavedReviews] = useState([]);
  const [rating, setRating] = useState(8);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editRating, setEditRating] = useState(8);
  const [editText, setEditText] = useState("");
  const [busyReviewId, setBusyReviewId] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const reviews = useMemo(
    () => [...savedReviews, ...seededReviews],
    [savedReviews, seededReviews]
  );

  useEffect(() => {
    let ignore = false;

    async function loadReviews() {
      setIsLoadingReviews(true);

      try {
        const response = await fetch(
          `/api/reviews?tmdbId=${encodeURIComponent(movieId)}`
        );

        if (!response.ok) {
          throw new Error("Failed to load reviews");
        }

        const data = await response.json();

        if (!ignore) {
          setSavedReviews(data.map(mapDatabaseReview));
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);

        if (!ignore) {
          setFormMessage("Saved reviews could not be loaded.");
        }
      } finally {
        if (!ignore) {
          setIsLoadingReviews(false);
        }
      }
    }

    loadReviews();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  function startEditing(review) {
    setEditingReviewId(review.id);
    setEditAuthorName(review.authorName);
    setEditRating(review.rating);
    setEditText(review.content);
    setFormMessage("");
  }

  function stopEditing() {
    setEditingReviewId(null);
    setEditAuthorName("");
    setEditRating(8);
    setEditText("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormMessage("");

    if (!reviewText.trim()) {
      setFormMessage("Write a review before posting.");
      return;
    }

    if (status !== "authenticated") {
      setFormMessage("Sign in to save your review to the database.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: Number(movieId),
          movieTitle,
          rating,
          content: reviewText.trim(),
          authorName: reviewerName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save review");
      }

      const savedReview = mapDatabaseReview(data);

      setSavedReviews((currentReviews) => [
        savedReview,
        ...currentReviews.filter((review) => review.id !== savedReview.id),
      ]);
      setReviewText("");
      setReviewerName("");
      setRating(8);
      setFormMessage("Review saved to the database.");
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateReview(event, reviewId) {
    event.preventDefault();
    setFormMessage("");

    if (!editText.trim()) {
      setFormMessage("Write a review before saving.");
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

      const updatedReview = mapDatabaseReview(data);

      setSavedReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        )
      );
      stopEditing();
      setFormMessage("Review updated.");
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setBusyReviewId(null);
    }
  }

  async function handleDeleteReview(reviewId) {
    const confirmed = window.confirm("Delete this review?");

    if (!confirmed) {
      return;
    }

    setFormMessage("");
    setBusyReviewId(reviewId);

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete review");
      }

      setSavedReviews((currentReviews) =>
        currentReviews.filter((review) => review.id !== reviewId)
      );

      if (editingReviewId === reviewId) {
        stopEditing();
      }

      setFormMessage("Review deleted.");
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setBusyReviewId(null);
    }
  }

  return (
    <section className="relative z-10 mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black text-lime-300 underline">
                Reviews
              </h2>
              <p className="mt-2 text-sm text-white/70">
                What viewers are saying about {movieTitle}.
              </p>
            </div>
            <p className="shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              {isLoadingReviews ? "Loading..." : `${reviews.length} reviews`}
            </p>
          </div>

          <div className="grid gap-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-lg border border-white/15 bg-black/45 p-5 text-white backdrop-blur-md"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{review.author}</h3>
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      {review.saved ? "Saved review" : "Sample review"} -{" "}
                      {review.createdAt}
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
                          className="inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={busyReviewId === review.id}
                          className="inline-flex items-center gap-1 rounded-md bg-red-500/80 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                      htmlFor={`edit-name-${review.id}`}
                    >
                      Name
                    </label>
                    <input
                      id={`edit-name-${review.id}`}
                      value={editAuthorName}
                      onChange={(event) =>
                        setEditAuthorName(event.target.value)
                      }
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
                      htmlFor={`edit-review-${review.id}`}
                    >
                      Review
                    </label>
                    <textarea
                      id={`edit-review-${review.id}`}
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
                        className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-lg border border-lime-300/25 bg-white/15 p-5 text-white backdrop-blur-md"
        >
          <h3 className="text-xl font-bold">Leave a review</h3>

          <label className="mt-5 block text-sm font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={reviewerName}
            onChange={(event) => setReviewerName(event.target.value)}
            maxLength={60}
            placeholder="Name shown on your review"
            className="mt-2 w-full rounded-md border border-white/20 bg-black/45 px-3 py-2 text-white outline-none transition focus:border-lime-300"
          />
          <p className="mt-2 text-xs text-white/55">
            This can be a fake display name. Leave it blank to use your account
            name.
          </p>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">Rating</legend>
            <StarRatingInput rating={rating} onChange={setRating} />
          </fieldset>

          <label className="mt-5 block text-sm font-semibold" htmlFor="review">
            Review
          </label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            rows={5}
            placeholder="Share your thoughts about the movie..."
            className="mt-2 w-full resize-none rounded-md border border-white/20 bg-black/45 px-3 py-2 text-white outline-none transition focus:border-lime-300"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime-300 px-4 py-3 font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={18} />
            {isSubmitting ? "Saving..." : "Post review"}
          </button>

          {formMessage && (
            <p className="mt-3 text-sm font-semibold text-lime-100">
              {formMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

MovieReviews.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  movieTitle: PropTypes.string.isRequired,
};
