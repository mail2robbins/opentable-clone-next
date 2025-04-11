"use client";

import { AuthenticationContext } from "@/app/context/AuthContext";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";

const ReservationForm = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const { data } = useContext(AuthenticationContext);
  const [inputs, setInputs] = useState({
    bookerFirstName: data ? data.firstName : "",
    bookerLastName: data ? data.lastName : "",
    bookerPhone: data ? data.phone : "",
    bookerEmail: data ? data.email : "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { loading, error, createReservation } = useReservation();
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [inputs]);

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {didBook ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="font-bold text-3xl mb-4 text-gray-800">
            You are all booked up!
          </h1>
          <p className="text-gray-600 mb-6">
            Your reservation has been confirmed. Enjoy your dining experience!
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3 text-gray-700">Reservation Details</h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span>{formatDate(day)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>{formatTime(time)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <span>Party of {partySize}</span>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Complete Your Reservation
          </h1>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          ) : null}
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-lg mb-3 text-gray-700">Reservation Summary</h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span>{formatDate(day)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>{formatTime(time)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <span>Party of {partySize}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="bookerFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                id="bookerFirstName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="First name"
                value={inputs.bookerFirstName}
                onChange={handleChangeInput}
                name="bookerFirstName"
                required
              />
            </div>
            <div>
              <label htmlFor="bookerLastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                id="bookerLastName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="Last name"
                value={inputs.bookerLastName}
                onChange={handleChangeInput}
                name="bookerLastName"
                required
              />
            </div>
            <div>
              <label htmlFor="bookerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                id="bookerPhone"
                type="tel"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="Phone number"
                value={inputs.bookerPhone}
                onChange={handleChangeInput}
                name="bookerPhone"
                required
              />
            </div>
            <div>
              <label htmlFor="bookerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="bookerEmail"
                type="email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="Email"
                value={inputs.bookerEmail}
                onChange={handleChangeInput}
                name="bookerEmail"
                required
              />
            </div>
            <div>
              <label htmlFor="bookerOccasion" className="block text-sm font-medium text-gray-700 mb-1">
                Occasion (optional)
              </label>
              <input
                id="bookerOccasion"
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="Birthday, Anniversary, etc."
                value={inputs.bookerOccasion}
                onChange={handleChangeInput}
                name="bookerOccasion"
              />
            </div>
            <div>
              <label htmlFor="bookerRequest" className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests (optional)
              </label>
              <input
                id="bookerRequest"
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                placeholder="Window seat, high chair, etc."
                value={inputs.bookerRequest}
                onChange={handleChangeInput}
                name="bookerRequest"
              />
            </div>
          </div>
          
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center h-14"
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                variant="indeterminate"
                disableShrink
              />
            ) : (
              "Complete Reservation"
            )}
          </button>
          
          <p className="mt-4 text-xs text-gray-500 text-center">
            By clicking &quot;Complete Reservation&quot; you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
