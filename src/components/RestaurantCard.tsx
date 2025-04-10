import { RestaurantCardType } from "@/app/page";
import Link from "next/link";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="w-full sm:w-64 h-auto sm:h-72 m-1 sm:m-3 rounded overflow-hidden border cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-48 sm:h-36 object-cover"
        />
        <div className="p-2 sm:p-3">
          <h3 className="font-bold text-xl sm:text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2 text-sm sm:text-base">
              {restaurant.reviews.length}
              {restaurant.reviews.length === 1 ? "review" : "reviews"}{" "}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize flex-wrap gap-2">
            <p>{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
