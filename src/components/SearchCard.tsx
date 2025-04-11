import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import Price from "./Price";
import { calculateReviewRatingAvg } from "@/utils/calculateReviewRatingAvg";
import Stars from "./Stars";
import { Clock, MapPin, Utensils } from "lucide-react";

const SearchCard = ({
  restaurant,
}: {
  restaurant: {
    id: number;
    name: string;
    main_image: string;
    description: string;
    open_time: string;
    close_time: string;
    slug: string;
    price: PRICE;
    location: Location;
    cuisine: Cuisine;
    reviews: Review[];
  };
}) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAvg(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else return "";
  };

  const rating = calculateReviewRatingAvg(restaurant.reviews);
  const ratingText = renderRatingText();
  const ratingColor = rating > 4 
    ? "text-green-600" 
    : rating > 3 
      ? "text-blue-600" 
      : "text-amber-600";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-48 h-48 sm:h-auto relative">
          <img 
            src={restaurant.main_image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm">
            <Price price={restaurant.price} />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-5 flex-1">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {restaurant.name}
              </h2>
              
              {/* Rating - Fixed layout to prevent overlapping */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Stars reviews={restaurant.reviews} />
                </div>
                
                {ratingText && (
                  <span className={`text-sm font-medium ${ratingColor}`}>
                    {ratingText}
                  </span>
                )}
                
                <span className="text-sm text-gray-500">
                  ({restaurant.reviews.length} {restaurant.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {restaurant.description}
              </p>
              
              {/* Details */}
              <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Utensils className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="capitalize">{restaurant.cuisine.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="capitalize">{restaurant.location.name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{restaurant.open_time} - {restaurant.close_time}</span>
                </div>
              </div>
            </div>
            
            {/* Action */}
            <div className="mt-auto">
              <Link 
                href={`/restaurant/${restaurant.slug}`}
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                View more information
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
