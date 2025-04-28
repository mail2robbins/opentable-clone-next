"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ReservationList from "@/components/ReservationList";
import { useAuthenticationContext } from "@/app/context/AuthContext";

export default function ReservationsPage() {
  const { data: user, loading } = useAuthenticationContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Reservations</h1>
      <ReservationList />
    </div>
  );
} 