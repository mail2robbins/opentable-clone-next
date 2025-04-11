import { Review } from "@prisma/client";
import Stars from "./Stars";
import { User } from "lucide-react";

const RestaurantReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col items-center mb-4 sm:mb-0 sm:mr-6">
          <div className="rounded-full bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 flex items-center justify-center shadow-md">
            <h2 className="text-white text-2xl font-bold uppercase">
              {review.first_name[0]}
              {review.last_name[0]}
            </h2>
          </div>
          <p className="text-center mt-2 font-medium text-gray-800">
            {review.first_name} {review.last_name}
          </p>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <Stars reviews={[]} rating={review.rating} />
          </div>
          <div className="mt-2">
            <p className="text-gray-700 leading-relaxed">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReviewCard;
