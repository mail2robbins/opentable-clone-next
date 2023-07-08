import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAvg } from "@/utils/calculateReviewRatingAvg";
import { ReactNode } from "react";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const rtng =
    rating || parseFloat(calculateReviewRatingAvg(reviews).toFixed(1));

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rtng - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.3) stars.push(emptyStar);
        else if (difference > 0.3 && difference <= 0.7) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    return stars.map((star, i) => {
      return <Image key={i} src={star} className="w-4 h-4 mr-1" alt="" />;
    });
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
