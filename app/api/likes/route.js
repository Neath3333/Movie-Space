import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

// GET all likes for current user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const likes = await prisma.like.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// POST add a like
export async function POST(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { tmdbId, movieTitle, moviePoster } = body;

    // Validation
    if (!tmdbId || !movieTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create like (unique constraint prevents duplicates)
    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        tmdbId,
        movieTitle,
        moviePoster,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    // Unique constraint violation = already liked
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already liked" },
        { status: 400 }
      );
    }
    console.error("Error creating like:", error);
    return NextResponse.json({ error: "Failed to create like" }, { status: 500 });
  }
}

// DELETE remove a like
export async function DELETE(request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { tmdbId } = body;

    if (!tmdbId) {
      return NextResponse.json(
        { error: "Missing tmdbId" },
        { status: 400 }
      );
    }

    // Delete like
    await prisma.like.deleteMany({
      where: {
        userId: session.user.id,
        tmdbId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting like:", error);
    return NextResponse.json({ error: "Failed to delete like" }, { status: 500 });
  }
}
