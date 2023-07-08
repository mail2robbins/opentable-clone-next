import { Review } from "@prisma/client"

export const calculateReviewRatingAvg = (reviews: Review[]) => {

    if (!reviews.length) return 0.0;
    return reviews.reduce((sum, review) => { return sum + review.rating }, 0.0) / reviews.length
}
