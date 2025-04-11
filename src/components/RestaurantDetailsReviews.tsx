import { Review } from "@prisma/client";
import RestaurantReviewCard from "./RestaurantReviewCard";
import { MessageSquare } from "lucide-react";

const RestaurantDetailsReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageSquare className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          What {reviews.length}{" "}
          {reviews.length === 1 ? "person is" : "people are"} saying
        </h2>
      </div>
      
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return <RestaurantReviewCard key={review.id} review={review} />;
          })
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No reviews yet. Be the first to review this restaurant!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsReviews;
