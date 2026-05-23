import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";

function serializeReview(review) {
  return {
    id: review.id,
    rating: review.rating,
    content: review.content,
    authorName: review.authorName,
    tmdbId: review.tmdbId,
    movieTitle: review.movieTitle,
    createdAt: review.createdAt,
    ...(review.user && { user: review.user }),
    canManage: true,
  };
}

// GET single review
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Check if user owns this review
    if (review.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(serializeReview(review));
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}

// PUT update review
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { rating, content, authorName } = body;
    const reviewRating = rating === undefined ? undefined : Number(rating);
    const displayName =
      authorName === undefined
        ? undefined
        : typeof authorName === "string"
          ? authorName.trim() || null
          : null;

    // Validation
    if (
      reviewRating !== undefined &&
      (!Number.isInteger(reviewRating) || reviewRating < 1 || reviewRating > 10)
    ) {
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

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update review
    const review = await prisma.review.update({
      where: { id },
      data: {
        ...(reviewRating !== undefined && { rating: reviewRating }),
        ...(content !== undefined && { content }),
        ...(displayName !== undefined && { authorName: displayName }),
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

    return NextResponse.json(serializeReview(review));
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE review
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete review
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
