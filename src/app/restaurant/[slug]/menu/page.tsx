import RestaurantDetailsMenu from "@/components/RestaurantDetailsMenu";
import RestaurantNavBar from "@/components/RestaurantNavBar";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  if (!restaurant?.items) {
    throw new Error();
  }

  return restaurant.items;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchRestaurantMenu(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <RestaurantDetailsMenu items={menu} />
      </div>
    </>
  );
};

export default RestaurantMenu;
