"use client";

import Link from "next/link";
import { partySize as partySizes, times } from "../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailability from "@/hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";
import { Calendar, Clock, Users, Search } from "lucide-react";

const RestaurantReservation = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { loading, data, error, fetchAvailability } = useAvailability();
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(format(date, "yyyy-MM-dd"));
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timesInWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (!isWithinWindow && time.time === openTime) {
        isWithinWindow = true;
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
      if (isWithinWindow) {
        timesInWindow.push(time);
      }
    });

    return timesInWindow;
  };

  const handleClick = async () => {
    await fetchAvailability({ slug, day, time, partySize });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="text-center border-b pb-4 mb-5">
        <h4 className="text-xl font-bold text-gray-800">Make a Reservation</h4>
      </div>
      
      <div className="space-y-5">
        {/* Party Size */}
        <div className="flex flex-col">
          <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-1">
            Party Size
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              id="partySize"
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 appearance-none bg-white"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
            >
              {partySizes.map((party) => {
                return (
                  <option key={party.value} value={party.value}>
                    {party.label}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div className="flex flex-col">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <DatePicker
                selected={selectedDate}
                onChange={handleChangeDate}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                dateFormat="MMMM d"
                id="date"
              />
            </div>
          </div>
          
          {/* Time */}
          <div className="flex flex-col">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="time"
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 appearance-none bg-white"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {filterTimeByRestaurantOpenWindow().map((time) => {
                  return (
                    <option key={time.time} value={time.time}>
                      {time.displayTime}
                    </option>
                  );
                })}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Find Time Button */}
        <div className="mt-6">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center h-14"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                value={100}
                variant="indeterminate"
                disableShrink
              />
            ) : (
              <div className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                <span>Find a Time</span>
              </div>
            )}
          </button>
        </div>
        
        {/* Available Times */}
        {data && data.length ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Select a time</p>
            <div className="grid grid-cols-2 gap-2">
              {data.map((time, index) => {
                return time.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                    key={index}
                    className="bg-red-600 hover:bg-red-700 text-center py-2 rounded-md text-white font-medium text-sm transition-colors duration-200"
                  >
                    {convertToDisplayTime(time.time as Time)}
                  </Link>
                ) : (
                  <button
                    key={index}
                    className="bg-gray-300 text-center py-2 rounded-md text-white font-medium text-sm cursor-not-allowed"
                    disabled
                  >
                    {convertToDisplayTime(time.time as Time)}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RestaurantReservation;
