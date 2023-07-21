import { Restaurant } from "@/app/restaurant/[slug]/layout";
import ReservationForm from "@/components/ReservationForm";
import RestaurantReserveHeader from "@/components/RestaurantReserveHeader";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

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
      main_image: true,
    },
  });

  if (!restaurant) {
    //throw new Error("Cannot find restaurant!");
    notFound();
  }
  return restaurant;
};

const Reserve = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <RestaurantReserveHeader
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <ReservationForm
          slug={params.slug}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
      </div>
    </div>
  );
};

export default Reserve;
