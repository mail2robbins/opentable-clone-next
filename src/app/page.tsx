import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";

import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
}
const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
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
      reviews: true,
    },
  });

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
