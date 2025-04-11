import { Info } from "lucide-react";

const RestaurantDetailsDescription = ({ desc }: { desc: string }) => {
  return (
    <div className="mt-4">
      <div className="flex items-start">
        <Info className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-2">About this restaurant</h2>
          <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsDescription;
