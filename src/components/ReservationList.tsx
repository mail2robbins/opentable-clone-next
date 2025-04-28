"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuthenticationContext } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { XCircle } from "lucide-react";
import Image from "next/image";

interface Booking {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  partySize: number;
}

export default function ReservationList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: user } = useAuthenticationContext();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/reservations");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/reservations/${bookingId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      
      // Remove the cancelled booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">You don&apos;t have any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="relative h-48 w-full">
            <Image
              src={booking.restaurantImage}
              alt={booking.restaurantName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.restaurantName}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">
                    Date: {format(new Date(booking.date), "MMMM d, yyyy")}
                  </p>
                  <p className="text-gray-600">
                    Party Size: {booking.partySize} people
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-full"
                title="Cancel booking"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 