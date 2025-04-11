import { calculateReviewRatingAvg } from "@/utils/calculateReviewRatingAvg";
import { Review } from "@prisma/client";
import Stars from "./Stars";
import { Star } from "lucide-react";

const RestaurantDetailsRating = (restaurantReviews: { reviews: Review[] }) => {
  const rating = parseFloat(
    calculateReviewRatingAvg(restaurantReviews.reviews).toFixed(1)
  );
  
  // Get rating color based on value
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-green-500";
    if (rating >= 3.5) return "text-yellow-500";
    if (rating >= 3.0) return "text-yellow-600";
    return "text-red-500";
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center">
        <div className="flex items-center">
          <Stars reviews={restaurantReviews.reviews} />
        </div>
        <div className={`ml-2 text-lg font-semibold ${getRatingColor(rating)}`}>
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="flex items-center text-gray-600">
        <Star className="w-4 h-4 mr-1 text-yellow-400" />
        <span>
          {restaurantReviews.reviews.length}{" "}
          {restaurantReviews.reviews.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>
    </div>
  );
};

export default RestaurantDetailsRating;
