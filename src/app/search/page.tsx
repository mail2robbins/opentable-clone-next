import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";
import { PRICE, PrismaClient, Restaurant } from "@prisma/client";
import { Search } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <SearchHeader city={searchParams.city} />
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search Filters
                </h2>
                <SearchSideBar
                  locations={locations}
                  cuisines={cuisines}
                  searchParams={searchParams}
                />
              </div>
            </div>
          </div>

          {/* Results section */}
          <div className="w-full lg:w-3/4">
            {restaurants?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No restaurants found
                  </h3>
                  <p className="text-gray-600">
                    We couldn't find any restaurants matching your search criteria. 
                    Try adjusting your filters or search in a different location.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants?.map((restaurant) => (
                  <SearchCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
