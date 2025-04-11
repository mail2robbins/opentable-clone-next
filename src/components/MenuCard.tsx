import { Item } from "@prisma/client";
import { DollarSign } from "lucide-react";

const MenuCard = ({ item }: { item: Item }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
          <div className="flex items-center text-red-600 font-medium">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{item.price}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuCard;
