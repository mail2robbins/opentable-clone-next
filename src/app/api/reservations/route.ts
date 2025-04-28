import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { Booking } from "@prisma/client";

export async function GET() {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("opentablejwt")?.value;
    
    if (!jwt) {
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await userResponse.json();
    const userEmail = userData.email;

    const bookings = await prisma.booking.findMany({
      where: {
        booker_email: userEmail,
      },
      include: {
        restaurant: {
          select: {
            name: true,
            main_image: true,
          },
        },
      },
      orderBy: {
        booking_time: "desc",
      },
    });


    const formattedBookings = bookings.map((booking: Booking & { restaurant: { name: string; main_image: string } }) => {
      const formattedBooking = {
        id: booking.id,
        restaurantName: booking.restaurant.name,
        restaurantImage: booking.restaurant.main_image,
        date: new Date(booking.booking_time).toLocaleString(),
        partySize: booking.number_of_people,
        status: "confirmed",
      };
      console.log("Formatted booking:", formattedBooking); // Debug log
      return formattedBooking;
    });

    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 