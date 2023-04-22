import { Review } from "@prisma/client";
import React from "react";
import CalculateReviewRatingAverage from "../../../../utils/CalculateReviewRatingAverage";
import Stars from "../../../components/Stars";

const Rating = ({review}: {review: Review[]}) => {
  return (
    <div className="flex items-end">
      <div className="flex items-center mt-2 ratings">
        <Stars review={review}/>
        <p className="ml-3 text-reg">{CalculateReviewRatingAverage(review).toFixed(1)}</p>
      </div>
      <div>
        <p className="ml-4 text-reg">{review.length} Review{review.length > 1 ? "s" : ""}</p>
      </div>
    </div>
  );
};

export default Rating;
