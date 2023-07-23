"use client";

import { AuthenticationContext } from "@/app/context/AuthContext";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

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

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <>
          <div className="mt-4">
            <h1 className="font-bold text-3xl mt-10 mb-7 pb-5">
              You are all booked up
            </h1>
            <div className="mt-1">
              <p>Enjoy your food!</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {error ? (
            <div className="mt-4">
              <h1 className="font-bold text-3xl mt-10 mb-7 pb-5">{error}</h1>
            </div>
          ) : null}

          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
            name="bookerFirstName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
            name="bookerLastName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
            name="bookerPhone"
          />
          <input
            type="email"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
            name="bookerEmail"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
            name="bookerOccasion"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
            name="bookerRequest"
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300 h-14"
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReservationForm;
