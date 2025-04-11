import { RestaurantCardType } from "@/app/page";
import Link from "next/link";
import Price from "./Price";
import Stars from "./Stars";
import { MapPin, Utensils } from "lucide-react";

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="w-full sm:w-64 h-auto sm:h-72 m-1 sm:m-3 rounded-xl overflow-hidden border border-gray-100 cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={restaurant.main_image}
            alt={restaurant.name}
            className="w-full h-48 sm:h-36 object-cover"
          />
          
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-xl sm:text-2xl mb-2 text-gray-800">{restaurant.name}</h3>
          <div className="flex items-center mb-3">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2 text-sm sm:text-base text-gray-600">
              {restaurant.reviews.length}
              {restaurant.reviews.length === 1 ? " review" : " reviews"}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Utensils className="w-4 h-4 mr-1.5 text-red-500" />
              <span className="capitalize">{restaurant.cuisine.name}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-red-500" />
              <span className="capitalize">{restaurant.location.name}</span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg border border-gray-500">
              <Price price={restaurant.price} />
          </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-red-500">Booked 3 times today</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
