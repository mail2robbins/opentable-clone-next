import { calculateReviewRatingAvg } from "@/utils/calculateReviewRatingAvg";
import { Review } from "@prisma/client";
import Stars from "./Stars";

const RestaurantDetailsRating = (restaurantReviews: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={restaurantReviews.reviews} />
        <p className="text-reg ml-3">
          {parseFloat(
            calculateReviewRatingAvg(restaurantReviews.reviews).toFixed(1)
          ).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {restaurantReviews.reviews.length}{" "}
          {restaurantReviews.reviews.length === 1 ? "Review" : "Reviews"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantDetailsRating;
