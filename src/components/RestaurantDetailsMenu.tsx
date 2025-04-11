import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";
import { Utensils, AlertCircle } from "lucide-react";

const RestaurantDetailsMenu = ({ items }: { items: Item[] }) => {
  // Group items by category if they have one
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <main className="bg-white">
      <div className="flex items-center mb-6">
        <Utensils className="w-5 h-5 text-gray-500 mr-2" />
        <h1 className="text-2xl font-semibold text-gray-800">Menu</h1>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-700">Menu not available</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default RestaurantDetailsMenu;
