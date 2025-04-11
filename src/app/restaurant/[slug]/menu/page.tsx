import RestaurantDetailsMenu from "@/components/RestaurantDetailsMenu";
import RestaurantNavBar from "@/components/RestaurantNavBar";
import { Item, PrismaClient, Restaurant } from "@prisma/client";
import { Utensils } from "lucide-react";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string): Promise<{ items: Item[], restaurantName: string }> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      items: true,
      description: true,
      open_time: true,
      close_time: true,
      slug: true,
      price: true,
      location: true,
      cuisine: true,
    },
  });

  if (!restaurant) {
    throw new Error("Cannot find restaurant!");
  }

  if (!restaurant?.items) {
    throw new Error("Cannot find menu items!");
  }

  return { 
    items: restaurant.items,
    restaurantName: restaurant.name
  };
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const { items, restaurantName } = await fetchRestaurantMenu(params.slug);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section with restaurant name */}
      <div className="relative h-40 md:h-48 w-full rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-red-600 to-red-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex justify-center mb-4">
              <Utensils className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{restaurantName}</h1>
            <p className="text-lg md:text-xl mt-2 opacity-90">Menu</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <RestaurantNavBar slug={params.slug} />
        </div>
        
        <div className="p-6 border-t border-gray-100">
          <RestaurantDetailsMenu items={items} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
