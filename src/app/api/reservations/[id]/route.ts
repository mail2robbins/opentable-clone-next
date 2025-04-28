import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("opentablejwt")?.value;
    
    if (!jwt) {
      console.log("No JWT token found");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from JWT token
    const userResponse = await fetch("https://opentable-clone-next-liard.vercel.app/api/auth/me", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!userResponse.ok) {
      console.log("Failed to verify JWT token:", await userResponse.text());
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await userResponse.json();
    const userEmail = userData.email;

    console.log("Attempting to delete booking:", {
      bookingId: params.id,
      userEmail: userEmail
    });

    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!booking) {
      console.log("Booking not found:", params.id);
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.booker_email !== userEmail) {
      console.log("Booking email mismatch:", {
        bookingEmail: booking.booker_email,
        userEmail: userEmail
      });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Delete the booking
    await prisma.booking.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    console.log("Successfully deleted booking:", params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 