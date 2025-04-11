import { Item } from "@prisma/client";
import { DollarSign } from "lucide-react";

const MenuCard = ({ item }: { item: Item }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-2 sm:p-3 md:p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base sm:text-lg text-gray-800">{item.name}</h3>
          <div className="flex items-center text-red-600 font-medium ml-2">
            {/* <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" /> */}
            <span className="text-sm sm:text-base">{item.price}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuCard;
