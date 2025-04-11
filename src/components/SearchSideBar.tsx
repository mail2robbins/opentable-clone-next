import { PRICE } from "@prisma/client";
import Link from "next/link";
import { MapPin, Utensils, DollarSign, X } from "lucide-react";

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: { id: number; name: string }[];
  cuisines: { id: number; name: string }[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$$",
      class: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      price: PRICE.REGULAR,
      label: "$$$",
      class:
        "border-r border-t border-b w-full text-reg text-center font-light p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$$",
      class:
        "border-r border-t border-b w-full text-reg text-center font-light p-2 rounded-r",
    },
  ];

  const { price, ...searchParamsWithoutPrice } = searchParams;

  return (
    <div className="w-full">
      {/* Region Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-gray-500" />
          Region
        </h2>
        <div className="space-y-2">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={{
                pathname: "/search",
                query: searchParams.city === location.name 
                  ? { ...searchParams, city: "" }
                  : { ...searchParams, city: location.name },
              }}
              className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                searchParams.city === location.name
                  ? "bg-red-50 text-red-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize">{location.name}</span>
                {searchParams.city === location.name && (
                  <X className="w-4 h-4" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cuisine Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Utensils className="w-5 h-5 mr-2 text-gray-500" />
          Cuisine
        </h2>
        <div className="space-y-2">
          {cuisines.map((cuisine) => (
            <Link
              key={cuisine.id}
              href={{
                pathname: "/search",
                query: searchParams.cuisine === cuisine.name
                  ? { ...searchParams, cuisine: "" }
                  : { ...searchParams, cuisine: cuisine.name },
              }}
              className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                searchParams.cuisine === cuisine.name
                  ? "bg-red-50 text-red-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize">{cuisine.name}</span>
                {searchParams.cuisine === cuisine.name && (
                  <X className="w-4 h-4" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
          Price
        </h2>
        <div className="flex rounded-md overflow-hidden shadow-sm">
          {prices.map((price) => (
            <Link
              key={price.price}
              href={{
                pathname: "/search",
                query: searchParams.price === price.price
                  ? { ...searchParamsWithoutPrice }
                  : { ...searchParams, price: price.price },
              }}
              className={`flex-1 text-center py-2 px-4 transition-colors duration-200 ${
                searchParams.price === price.price
                  ? "bg-red-600 text-white font-medium"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(searchParams.city || searchParams.cuisine || searchParams.price) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {searchParams.city && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {searchParams.city}
              </span>
            )}
            {searchParams.cuisine && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {searchParams.cuisine}
              </span>
            )}
            {searchParams.price && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {prices.find(p => p.price === searchParams.price)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSideBar;
