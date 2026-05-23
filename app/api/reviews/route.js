import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";

function serializeReview(review, currentUserId) {
  const { userId, ...publicReview } = review;

  return {
    ...publicReview,
    canManage: userId === currentUserId,
  };
}

// GET reviews. With tmdbId, returns public reviews for one movie.
// Without tmdbId, returns the signed-in user's reviews.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tmdbId = searchParams.get("tmdbId");
    const shouldShowAll = searchParams.get("all") === "true";

    if (shouldShowAll) {
      const session = await auth();
      const reviews = await prisma.review.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        reviews.map((review) => serializeReview(review, session?.user?.id))
      );
    }

    if (tmdbId) {
      const session = await auth();
      const movieId = Number(tmdbId);

      if (!Number.isInteger(movieId)) {
        return NextResponse.json({ error: "Invalid tmdbId" }, { status: 400 });
      }

      const reviews = await prisma.review.findMany({
        where: { tmdbId: movieId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        reviews.map((review) => serializeReview(review, session?.user?.id))
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST create new review
export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { tmdbId, movieTitle, rating, content, authorName } = body;
    const movieId = Number(tmdbId);
    const reviewRating = Number(rating);
    const displayName =
      typeof authorName === "string" ? authorName.trim() || null : null;

    // Validation
    if (!Number.isInteger(movieId) || !movieTitle || !reviewRating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (reviewRating < 1 || reviewRating > 10) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 10" },
        { status: 400 }
      );
    }

    if (displayName && displayName.length > 60) {
      return NextResponse.json(
        { error: "Name must be 60 characters or less" },
        { status: 400 }
      );
    }

    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        tmdbId: movieId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "Review already exists for this movie" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        tmdbId: movieId,
        movieTitle,
        rating: reviewRating,
        content: content || "",
        authorName: displayName,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(serializeReview(review, session.user.id), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
