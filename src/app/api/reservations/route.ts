import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        booker_email: session.user.email,
      },
      include: {
        restaurant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        booking_time: "asc",
      },
    });

    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      restaurantName: booking.restaurant.name,
      date: booking.booking_time.toISOString(),
      partySize: booking.number_of_people,
      status: "confirmed", // Since we don't have a status field in Booking model
    }));

    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 