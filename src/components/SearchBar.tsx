"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = ({ city }: { city?: string }) => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (location && location.trim() !== "") {
      router.push(`/search?city=${location}`);
      setLocation("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-4 sm:px-0">
      <div className="relative w-full sm:w-auto">
        <input
          className="rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 w-full sm:w-[450px] p-3 text-base sm:text-lg"
          type="text"
          placeholder="State, city or town"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button
        className="rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 px-6 sm:px-9 py-3 text-white font-medium w-full sm:w-auto text-base sm:text-lg shadow-sm hover:shadow-md"
        onClick={handleSearch}
      >
        Let&apos;s go
      </button>
    </div>
  );
};

export default SearchBar;
