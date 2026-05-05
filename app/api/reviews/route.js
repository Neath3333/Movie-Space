import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

// GET all reviews for current user
export async function GET() {
  try {
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
    const { tmdbId, movieTitle, rating, content } = body;

    // Validation
    if (!tmdbId || !movieTitle || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 10) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 10" },
        { status: 400 }
      );
    }

    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        tmdbId: tmdbId,
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
        tmdbId,
        movieTitle,
        rating,
        content: content || "",
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}