import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";
import { Utensils, AlertCircle } from "lucide-react";

const RestaurantDetailsMenu = ({ items }: { items: Item[] }) => {
  return (
    <main className="bg-white">
      <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
        <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-1 sm:mr-2" />
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Menu</h1>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 flex items-start">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-700 text-sm sm:text-base">Menu not available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
};

export default RestaurantDetailsMenu;
