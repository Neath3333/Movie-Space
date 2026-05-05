import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

// GET single review
export async function GET(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Check if user owns this review
    if (review.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}

// PUT update review
export async function PUT(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { rating, content } = body;

    // Validation
    if (rating && (rating < 1 || rating > 10)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 10" },
        { status: 400 }
      );
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update review
    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        ...(rating !== undefined && { rating }),
        ...(content !== undefined && { content }),
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE review
export async function DELETE(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete review
    await prisma.review.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}