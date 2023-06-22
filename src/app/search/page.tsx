import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";
import { PrismaClient, Restaurant } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = async (city: string) => {
  if (!city)
    return prisma.restaurant.findMany({
      select: {
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
      },
    });

  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
    select: {
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
    },
  });
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city: string };
}) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams.city);
  return (
    <>
      <SearchHeader />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
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
