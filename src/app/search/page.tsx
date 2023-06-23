import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";
import { PRICE, PrismaClient, Restaurant } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = async (city?: string) => {
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
  };

  if (!city)
    return prisma.restaurant.findMany({
      select,
    });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    orderBy: [{ name: "asc" }],
    select: { id: true, name: true },
  });

  if (!locations) throw new Error();

  return locations;
};

const fetchCusines = async () => {
  const cusines = await prisma.cuisine.findMany({
    orderBy: [{ name: "asc" }],
    select: { id: true, name: true },
  });

  if (!cusines) throw new Error();

  return cusines;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city?: string; cusine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams.city);
  const locations = await fetchLocations();
  const cusines = await fetchCusines();
  return (
    <>
      <SearchHeader city={searchParams.city} />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cusines={cusines}
          searchParams={searchParams}
        />
        {restaurants.length === 0 ? (
          <div className="w-5/6">
            <p>No restaurants available matching the search term</p>
          </div>
        ) : (
          <div className="w-5/6">
            {restaurants.map((restaurant) => (
              <SearchCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
