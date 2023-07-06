import { PRICE } from "@prisma/client";
import Link from "next/link";

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
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) =>
          searchParams.city === location.name ? (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, city: "" },
              }}
              key={location.id}
              className="font-light text-reg capitalize"
            >
              {location.name}
            </Link>
          ) : (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, city: location.name },
              }}
              key={location.id}
              className="font-light text-reg capitalize"
            >
              {location.name}
            </Link>
          )
        )}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) =>
          searchParams.cuisine === cuisine.name ? (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: "" },
              }}
              key={cuisine.id}
              className="font-light text-reg capitalize"
            >
              {cuisine.name}
            </Link>
          ) : (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisine.name },
              }}
              key={cuisine.id}
              className="font-light text-reg capitalize"
            >
              {cuisine.name}
            </Link>
          )
        )}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) =>
            searchParams.price === price.price ? (
              <Link
                key={price.price}
                href={{
                  pathname: "/search",
                  query: { ...searchParamsWithoutPrice },
                }}
                className={price.class}
              >
                {price.label}
              </Link>
            ) : (
              <Link
                key={price.price}
                href={{
                  pathname: "/search",
                  query: { ...searchParams, price: price.price },
                }}
                className={price.class}
              >
                {price.label}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
