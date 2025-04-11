import { Item } from "@prisma/client";
import { DollarSign } from "lucide-react";

const MenuCard = ({ item }: { item: Item }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base sm:text-lg text-gray-800">{item.name}</h3>
          <div className="flex items-center text-red-600 font-medium ml-2 bg-red-50 px-2 py-1 rounded-full">
            {/* <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" /> */}
            <span className="text-sm sm:text-base">{item.price}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuCard;
