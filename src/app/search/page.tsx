import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";
import { PRICE, PrismaClient, Restaurant } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = async (
  city?: string,
  cuisine?: string,
  price?: PRICE
) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    description: true,
    open_time: true,
    close_time: true,
    slug: true,
    price: true,
    location: true,
    cuisine: true,
    reviews: true,
  };

  if (!city && !cuisine && !price)
    return prisma.restaurant.findMany({
      select,
    });

  if (city !== "" && cuisine !== "") {
    return prisma.restaurant.findMany({
      where: {
        location: {
          name: {
            equals: city?.toLowerCase(),
          },
        },
        cuisine: {
          name: { equals: cuisine?.toLowerCase() },
        },
        price: {
          equals: price,
        },
      },
      select,
    });
  } else if (city === "" && cuisine !== "") {
    return prisma.restaurant.findMany({
      where: {
        cuisine: {
          name: { equals: cuisine?.toLowerCase() },
        },
        price: {
          equals: price,
        },
      },
      select,
    });
  } else if (city !== "" && cuisine === "") {
    return prisma.restaurant.findMany({
      where: {
        location: {
          name: {
            equals: city?.toLowerCase(),
          },
        },
        price: {
          equals: price,
        },
      },
      select,
    });
  } else if (city === "" && cuisine === "") {
    return prisma.restaurant.findMany({
      where: {
        price: {
          equals: price,
        },
      },
      select,
    });
  }
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    orderBy: [{ name: "asc" }],
    select: { id: true, name: true },
  });

  if (!locations) throw new Error("Cannot find location!");

  return locations;
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    orderBy: [{ name: "asc" }],
    select: { id: true, name: true },
  });

  if (!cuisines) throw new Error("Cannot find cuisine!");

  return cuisines;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurantsByLocation(
    searchParams.city,
    searchParams.cuisine,
    searchParams.price
  );
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <>
      <SearchHeader city={searchParams.city} />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        {restaurants?.length === 0 ? (
          <div className="w-5/6">
            <p>No restaurants available matching the search term</p>
          </div>
        ) : (
          <div className="w-5/6">
            {restaurants?.map((restaurant) => (
              <SearchCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
