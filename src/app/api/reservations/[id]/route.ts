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

    const bookingId = parseInt(params.id);

    // First, delete related BookingsOnTables records
    await prisma.bookingsOnTables.deleteMany({
      where: { booking_id: bookingId },
    });

    // Then, delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
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