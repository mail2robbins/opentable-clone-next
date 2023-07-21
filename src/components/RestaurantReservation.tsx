"use client";

import Link from "next/link";
import { partySize as partySizes, times } from "../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailability from "@/hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";

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
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
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
    <div className="relative w-[250px] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-reg font-bold">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
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
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light w-28 text-reg"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
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
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-10"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="inherit" value={100} />
          ) : (
            "Find a Time"
          )}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time, index) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  key={index}
                  className="bg-red-600 rounded w-[40%] text-center py-2 m-2 text-white font-bold h-9 text-sm"
                >
                  {convertToDisplayTime(time.time)}
                </Link>
              ) : (
                <button
                  key={index}
                  className="bg-gray-400 rounded w-[40%] px-4 m-2 text-white font-bold h-9 text-sm"
                  disabled
                >
                  {convertToDisplayTime(time.time)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RestaurantReservation;
