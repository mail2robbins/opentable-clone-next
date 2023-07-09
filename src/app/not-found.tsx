"use client";

import Image from "next/image";
import React from "react";
import errorMascot from "../../public/icons/error.png";

const NotFound = ({ error }: { error: Error }) => {
  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarrassing!</h3>
        <p className="text-reg font-bold">
          We could not find that restaurant or page!
        </p>
        <p className="mt-6 text-sm font-light">Error code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
