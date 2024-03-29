import RestaurantDetailsDescription from "@/components/RestaurantDetailsDescription";
import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import RestaurantDetailsRating from "@/components/RestaurantDetailsRating";
import RestaurantDetailsReviews from "@/components/RestaurantDetailsReviews";
import RestaurantDetailsTitle from "@/components/RestaurantDetailsTitle";
import RestaurantImages from "@/components/RestaurantImages";
import RestaurantNavBar from "@/components/RestaurantNavBar";
import RestaurantReservation from "@/components/RestaurantReservation";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();
export interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
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

  if (!restaurant) {
    throw new Error("Cannot find restaurant!");
  }
  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <RestaurantDetailsTitle name={restaurant.name} />
        <RestaurantDetailsRating reviews={restaurant.reviews} />
        <RestaurantDetailsDescription desc={restaurant.description} />
        <RestaurantImages images={restaurant.images} />
        <RestaurantDetailsReviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <RestaurantReservation
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
};

export default RestaurantDetails;
