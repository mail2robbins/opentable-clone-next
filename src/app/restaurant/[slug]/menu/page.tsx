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
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      {/* Compact hero section for small devices */}
      <div className="relative h-24 sm:h-32 md:h-40 w-full rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-red-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex justify-center mb-1 sm:mb-2">
              <Utensils className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{restaurantName}</h1>
            <p className="text-sm sm:text-base md:text-lg mt-1 opacity-90">Menu</p>
          </div>
        </div>
      </div>

      {/* Main content with reduced padding on small screens */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6">
          <RestaurantNavBar slug={params.slug} />
        </div>
        
        <div className="p-3 sm:p-4 md:p-6 border-t border-gray-100">
          <RestaurantDetailsMenu items={items} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
